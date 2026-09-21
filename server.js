const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { GAMES_CATALOG } = require('./questions');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
  transports: ['websocket', 'polling']
});

const HOST_PASSWORD = 'GameMasterMTB';

app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1h',
  etag: true
}));

// Route mappings
app.get('/control', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'control.html'));
});

app.get('/screen', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'screen.html'));
});

// Backward compatibility redirects for host view
app.get('/host', (req, res) => {
  res.redirect('/screen');
});
app.get('/host.html', (req, res) => {
  res.redirect('/screen');
});

// Player Arena
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const RESULT_REVEAL_MS = 6000;

// ---------------------------------------------------------------------------
// SERVER STATE — Single Source of Truth
// ---------------------------------------------------------------------------
let players = {};           // name -> { joinedAt, avatar, socketId }
let activeGameId = 'game1'; // 'game1' | 'game2' | 'game3'
let activeSetId = 'set1';   // 'set1' | 'set2' | 'set3' | 'set4' | 'set5'
let session = { phase: 'lobby' };
let scores = {
  game1: {},
  game2: {},
  game3: {}
};
let gameAudioEnabled = true;
let currentAnswers = {};    // name -> { choice, answeredAt, socketId }
let roundTimeoutHandle = null;

function uniqueName(base) {
  if (!players[base]) return base;
  let n = 2;
  while (players[base + ' ' + n]) n++;
  return base + ' ' + n;
}

function getInitials(name) {
  if (!name) return 'GA';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function playerList() {
  return Object.keys(players)
    .map(name => ({
      name,
      initials: getInitials(name),
      joinedAt: players[name].joinedAt
    }))
    .sort((a, b) => a.joinedAt - b.joinedAt);
}

function broadcastPlayers() {
  const count = Object.keys(players).length;
  // Lightweight count-only update for mobile players
  io.emit('players:update', { count });
  // Full player list strictly for host dashboard and broadcaster screen
  io.to('host').to('screen').emit('players:update', {
    players: playerList(),
    count
  });
}

function getActiveGameRounds() {
  const game = GAMES_CATALOG[activeGameId];
  if (!game || !game.sets) return [];
  return game.sets[activeSetId] || game.sets.set1 || [];
}

function leaderboardArray(gameId = activeGameId, limit = 0) {
  const gameScores = scores[gameId] || {};
  const sorted = Object.keys(gameScores)
    .map(name => ({
      name,
      initials: getInitials(name),
      score: gameScores[name]
    }))
    .sort((a, b) => b.score - a.score);

  return limit > 0 ? sorted.slice(0, limit) : sorted;
}

function publicSessionPayload(isPrivileged = false) {
  const gameMeta = GAMES_CATALOG[activeGameId];
  const allGames = Object.keys(GAMES_CATALOG).map(id => {
    const sets = GAMES_CATALOG[id].sets || {};
    const curSetRounds = sets[activeSetId] || sets.set1 || [];
    return {
      id,
      title: GAMES_CATALOG[id].title,
      tagline: GAMES_CATALOG[id].tagline,
      icon: GAMES_CATALOG[id].icon,
      roundCount: curSetRounds.length,
      isActive: id === activeGameId
    };
  });

  let payload;
  if (session.phase === 'round') {
    const rounds = getActiveGameRounds();
    const round = rounds[session.roundIndex] || rounds[0];
    payload = {
      phase: 'round',
      gameId: activeGameId,
      gameTitle: gameMeta.title,
      gameIcon: gameMeta.icon,
      setId: activeSetId,
      roundIndex: session.roundIndex,
      totalRounds: rounds.length,
      type: round.type || 'standard',
      mediaType: round.mediaType || (round.image ? 'image' : 'text'),
      category: round.category || 'Challenge',
      label: round.label || round.prompt,
      subtitle: round.subtitle || '',
      snippet: round.snippet || '',
      image: round.image || null,
      options: round.options,
      roundEndsAt: session.roundEndsAt
    };
  } else if (session.phase === 'roundResult') {
    const rounds = getActiveGameRounds();
    const round = rounds[session.roundIndex] || rounds[0];
    const nextRound = rounds[session.roundIndex + 1];
    payload = {
      phase: 'roundResult',
      gameId: activeGameId,
      gameTitle: gameMeta.title,
      setId: activeSetId,
      roundIndex: session.roundIndex,
      totalRounds: rounds.length,
      correctIndex: round.correct,
      correctAnswerText: round.options ? round.options[round.correct] : '',
      explanation: round.explanation || null,
      resultUntil: session.resultUntil,
      isFinal: session.isFinal,
      nextRoundImage: nextRound ? (nextRound.image || null) : null,
      leaderboard: leaderboardArray(activeGameId, isPrivileged ? 100 : 10)
    };
  } else if (session.phase === 'startingCountdown') {
    const rounds = getActiveGameRounds();
    const firstRound = rounds[0] || null;
    payload = {
      phase: 'startingCountdown',
      gameId: activeGameId,
      gameTitle: gameMeta.title,
      gameIcon: gameMeta.icon,
      setId: activeSetId,
      startsAt: session.startsAt,
      firstRoundImage: firstRound ? (firstRound.image || null) : null
    };
  } else if (session.phase === 'gameEnded') {
    payload = {
      phase: 'gameEnded',
      gameId: activeGameId,
      gameTitle: gameMeta.title,
      setId: activeSetId,
      leaderboard: leaderboardArray(activeGameId, isPrivileged ? 100 : 10)
    };
  } else {
    payload = {
      phase: 'lobby',
      activeGameId,
      activeGameTitle: gameMeta.title,
      activeSetId,
      availableSets: ['set1', 'set2', 'set3', 'set4', 'set5'],
      games: allGames
    };
  }

  payload.audioEnabled = gameAudioEnabled;
  return payload;
}

function broadcastSession() {
  io.emit('session:update', publicSessionPayload(false));
  io.to('host').to('screen').emit('session:update', publicSessionPayload(true));
}

function startRound(idx) {
  const rounds = getActiveGameRounds();
  if (idx >= rounds.length) {
    session = { phase: 'gameEnded', gameId: activeGameId, setId: activeSetId };
    broadcastSession();
    return;
  }

  const round = rounds[idx];
  currentAnswers = {};
  const durationMs = (round.timer || 12) * 1000;

  session = {
    phase: 'round',
    gameId: activeGameId,
    setId: activeSetId,
    roundIndex: idx,
    roundStartedAt: Date.now(),
    roundEndsAt: Date.now() + durationMs
  };

  broadcastSession();
  io.to('host').to('screen').emit('answered:count', 0);

  if (roundTimeoutHandle) clearTimeout(roundTimeoutHandle);
  roundTimeoutHandle = setTimeout(() => finalizeRound(idx), durationMs);
}

function finalizeRound(idx) {
  const rounds = getActiveGameRounds();
  const round = rounds[idx] || rounds[0];
  const roundStartedAt = session.roundStartedAt || Date.now();

  // Sort correct answers by time
  const correctEntries = Object.keys(currentAnswers)
    .map(name => ({
      name,
      ...currentAnswers[name],
      speedSeconds: Math.max(0.1, ((currentAnswers[name].answeredAt - roundStartedAt) / 1000)).toFixed(2)
    }))
    .filter(a => a.choice === round.correct)
    .sort((a, b) => a.answeredAt - b.answeredAt);

  // Award points: Base 20 pts for correct answer + up to 80 speed bonus points (scales up to 200 players)
  const roundPointsMap = {};
  correctEntries.forEach((entry, rankIdx) => {
    const speedBonus = Math.max(80 - rankIdx, 0);
    const points = 20 + speedBonus;
    scores[activeGameId][entry.name] = (scores[activeGameId][entry.name] || 0) + points;
    roundPointsMap[entry.name] = {
      rank: rankIdx + 1,
      points,
      speedSeconds: entry.speedSeconds
    };
  });

  // Emit personalized feedback to every player
  Object.keys(players).forEach(name => {
    const socketId = players[name].socketId;
    if (!socketId) return;

    const answerInfo = currentAnswers[name];
    let resultPayload = {
      answered: false,
      isCorrect: false,
      pointsEarned: 0,
      roundRank: null,
      speedSeconds: null,
      totalScore: scores[activeGameId][name] || 0,
      correctIndex: round.correct,
      correctAnswerText: round.options ? round.options[round.correct] : ''
    };

    if (answerInfo) {
      resultPayload.answered = true;
      if (answerInfo.choice === round.correct) {
        const perf = roundPointsMap[name];
        resultPayload.isCorrect = true;
        resultPayload.pointsEarned = perf.points;
        resultPayload.roundRank = perf.rank;
        resultPayload.speedSeconds = perf.speedSeconds;
      }
    }

    io.to(socketId).emit('round:personal-result', resultPayload);
  });

  const isFinal = idx + 1 >= rounds.length;
  session = {
    phase: 'roundResult',
    gameId: activeGameId,
    setId: activeSetId,
    roundIndex: idx,
    resultUntil: Date.now() + RESULT_REVEAL_MS,
    isFinal,
    nextRoundIndex: isFinal ? null : idx + 1
  };
  broadcastSession();

  roundTimeoutHandle = setTimeout(() => {
    if (session.isFinal) {
      session = { phase: 'gameEnded', gameId: activeGameId, setId: activeSetId };
      broadcastSession();
    } else {
      startRound(session.nextRoundIndex);
    }
  }, RESULT_REVEAL_MS);
}

// ---------------------------------------------------------------------------
// SOCKET.IO EVENT HANDLERS
// ---------------------------------------------------------------------------
io.on('connection', (socket) => {
  socket.on('join', (data) => {
    const rawName = typeof data === 'object' ? data.name : data;
    const trimmed = (rawName || '').trim().slice(0, 24);

    if (!trimmed) {
      socket.emit('join:error', 'Please enter your name to join');
      return;
    }

    let finalName = trimmed;
    if (!players[trimmed]) {
      finalName = uniqueName(trimmed);
      players[finalName] = {
        joinedAt: Date.now(),
        initials: getInitials(finalName),
        socketId: socket.id
      };
      broadcastPlayers();
    } else {
      players[trimmed].socketId = socket.id;
      finalName = trimmed;
    }

    socket.data.name = finalName;
    socket.emit('joined', {
      name: finalName,
      initials: getInitials(finalName)
    });
    socket.emit('players:update', { count: Object.keys(players).length });
    socket.emit('audio:state', gameAudioEnabled);
    socket.emit('session:update', publicSessionPayload(false));
  });

  socket.on('answer', (choice) => {
    const name = socket.data.name;
    if (!name) return;
    if (session.phase !== 'round') return;
    if (currentAnswers[name]) return; // already answered

    currentAnswers[name] = {
      choice,
      answeredAt: Date.now(),
      socketId: socket.id
    };

    // Emit to host and screen rooms
    io.to('host').to('screen').emit('answered:count', Object.keys(currentAnswers).length);
  });

  // Screen / Projector Registration
  socket.on('screen:register', () => {
    socket.join('screen');
    socket.emit('players:update', { players: playerList(), count: Object.keys(players).length });
    socket.emit('audio:state', gameAudioEnabled);
    socket.emit('session:update', publicSessionPayload(true));
  });

  // Host Authentication & Registration
  socket.on('host:auth', (data, callback) => {
    const pw = typeof data === 'object' ? data.password : data;
    if (pw === HOST_PASSWORD) {
      socket.join('host');
      socket.data.isHost = true;
      if (typeof callback === 'function') callback({ success: true });
      socket.emit('host:auth-success');
      socket.emit('players:update', { players: playerList(), count: Object.keys(players).length });
      socket.emit('audio:state', gameAudioEnabled);
      socket.emit('session:update', publicSessionPayload(true));
    } else {
      if (typeof callback === 'function') callback({ success: false, error: 'Incorrect passcode' });
      socket.emit('host:auth-error', 'Incorrect passcode');
    }
  });

  socket.on('host:register', () => {
    // Re-verify host status if already authenticated
    if (socket.data.isHost) {
      socket.join('host');
    }
  });

  socket.on('host:select-game', (gameId) => {
    if (!socket.data.isHost) return;
    if (GAMES_CATALOG[gameId] && session.phase === 'lobby') {
      activeGameId = gameId;
      broadcastSession();
    }
  });

  socket.on('host:select-set', (setId) => {
    if (!socket.data.isHost) return;
    if (['set1', 'set2', 'set3', 'set4', 'set5'].includes(setId) && session.phase === 'lobby') {
      activeSetId = setId;
      broadcastSession();
    }
  });

  socket.on('host:start-game', (data) => {
    if (!socket.data.isHost) return;
    if (typeof data === 'string' && GAMES_CATALOG[data]) {
      activeGameId = data;
    } else if (typeof data === 'object') {
      if (data.gameId && GAMES_CATALOG[data.gameId]) activeGameId = data.gameId;
      if (data.setId && ['set1', 'set2', 'set3', 'set4', 'set5'].includes(data.setId)) activeSetId = data.setId;
    }
    if (session.phase !== 'lobby' && session.phase !== 'gameEnded') return;
    scores[activeGameId] = {};

    const rounds = getActiveGameRounds();
    const firstRound = rounds[0] || null;
    const COUNTDOWN_MS = 3500;

    session = {
      phase: 'startingCountdown',
      gameId: activeGameId,
      setId: activeSetId,
      startsAt: Date.now() + COUNTDOWN_MS,
      firstRoundImage: firstRound ? (firstRound.image || null) : null
    };
    broadcastSession();

    if (roundTimeoutHandle) clearTimeout(roundTimeoutHandle);
    roundTimeoutHandle = setTimeout(() => {
      startRound(0);
    }, COUNTDOWN_MS);
  });

  socket.on('host:return-lobby', () => {
    if (!socket.data.isHost) return;
    if (roundTimeoutHandle) {
      clearTimeout(roundTimeoutHandle);
      roundTimeoutHandle = null;
    }
    session = { phase: 'lobby' };
    currentAnswers = {};
    broadcastSession();
  });

  socket.on('host:skip-round', () => {
    if (!socket.data.isHost) return;
    if (session.phase !== 'round') return;
    if (roundTimeoutHandle) {
      clearTimeout(roundTimeoutHandle);
      roundTimeoutHandle = null;
    }
    finalizeRound(session.roundIndex);
  });

  socket.on('host:reset-scores', () => {
    if (!socket.data.isHost) return;
    scores[activeGameId] = {};
    broadcastSession();
  });

  socket.on('host:set-audio', (enabled) => {
    if (!socket.data.isHost) return;
    gameAudioEnabled = Boolean(enabled);
    io.emit('audio:state', gameAudioEnabled);
    broadcastSession();
  });

  socket.on('host:get-state', () => {
    if (!socket.data.isHost) return;
    socket.emit('players:update', { players: playerList(), count: Object.keys(players).length });
    socket.emit('audio:state', gameAudioEnabled);
    socket.emit('session:update', publicSessionPayload(true));
  });

  socket.on('disconnect', () => {
    const name = socket.data.name;
    if (name && players[name] && players[name].socketId === socket.id) {
      players[name].socketId = null; // Marked disconnected but score persists
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('----------------------------------------------------');
  console.log('GritinAI Connect 2.0 Live Games Engine Running');
  console.log(`Player Arena:       http://localhost:${PORT}`);
  console.log(`Host Control Deck:  http://localhost:${PORT}/control`);
  console.log(`Broadcaster Screen: http://localhost:${PORT}/screen`);
  console.log('----------------------------------------------------');
});
