const socket = io({
  transports: ['websocket', 'polling']
});

// ---------------------------------------------------------------------------
// AUDIO ENGINE (Web Audio API)
// Sounds are strictly restricted to active gameplay (rounds / results)
// ---------------------------------------------------------------------------
let audioCtx = null;
let audioEnabled = true;

function isGameActive() {
  return currentServerPhase === 'round' || currentServerPhase === 'roundResult' || currentServerPhase === 'gameEnded';
}

function setAudioEnabled(enabled) {
  audioEnabled = Boolean(enabled);
  if (!audioEnabled && audioCtx && audioCtx.state === 'running') {
    audioCtx.suspend().catch(() => {});
  } else if (audioEnabled && audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
}

socket.on('audio:state', (enabled) => {
  setAudioEnabled(enabled);
});

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended' && audioEnabled) {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
  if (!audioEnabled || !isGameActive()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function soundClick() {
  if (!isGameActive()) return;
  playTone(600, 'sine', 0.05, 0.08);
}

function soundTick() {
  if (!isGameActive()) return;
  playTone(880, 'sine', 0.04, 0.05);
}

function soundUrgentTick() {
  if (!isGameActive()) return;
  playTone(1100, 'triangle', 0.06, 0.08);
}

function soundCorrect() {
  if (!audioEnabled || !isGameActive()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 'triangle', 0.2, 0.1), i * 70);
    });
  } catch (e) {}
}

function soundWrong() {
  if (!audioEnabled || !isGameActive()) return;
  try {
    playTone(220, 'sawtooth', 0.25, 0.08);
  } catch (e) {}
}

// ---------------------------------------------------------------------------
// THEME MANAGER (Dark / Light Mode)
// ---------------------------------------------------------------------------
const themeToggleBtn = document.getElementById('player-theme-toggle-btn');
const themeLabel = document.getElementById('theme-label-text');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  if (themeLabel) {
    themeLabel.textContent = isDark ? 'Light' : 'Dark';
  }
  if (themeToggleBtn) {
    themeToggleBtn.classList.toggle('is-dark', isDark);
    themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    themeToggleBtn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  localStorage.setItem('gritin_player_theme', theme);
}

const savedPlayerTheme = localStorage.getItem('gritin_player_theme') || 'dark';
applyTheme(savedPlayerTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isCurrentlyDark = document.body.classList.contains('dark-theme');
    applyTheme(isCurrentlyDark ? 'light' : 'dark');
  });
}

// ---------------------------------------------------------------------------
// CLIENT STATE & INITIALS
// ---------------------------------------------------------------------------
let myName = localStorage.getItem('gritin_player_name') || null;
let currentRound = null;
let answeredThisRound = false;
let countdownInterval = null;
let currentServerPhase = 'lobby';

function getInitials(name) {
  if (!name) return 'GA';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function escapeHtml(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ---------------------------------------------------------------------------
// CLIENT ROUTING SYSTEM (Hash-Based)
// ---------------------------------------------------------------------------
function navigate(route) {
  if (window.location.hash !== route) {
    window.location.hash = route;
  }
  handleRouting();
}

// Header scroll blur effect
const siteHeader = document.getElementById('site-header');
if (siteHeader) {
  window.addEventListener('scroll', () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

function showScreen(screenId) {
  const screens = ['welcome-screen', 'join-screen', 'lobby-screen', 'countdown-screen', 'round-screen', 'result-screen'];
  screens.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', id !== screenId);
  });
}

function handleRouting() {
  let hash = window.location.hash || '#/';
  if (hash === '' || hash === '#') hash = '#/';

  // If game is active on server, keep player in the game screens
  if (currentServerPhase === 'startingCountdown') {
    showScreen('countdown-screen');
    return;
  }
  if (currentServerPhase === 'round') {
    showScreen('round-screen');
    return;
  }
  if (currentServerPhase === 'roundResult' || currentServerPhase === 'gameEnded') {
    stopCountdown();
    showScreen('result-screen');
    return;
  }

  // Pre-game / Lobby phases: stop countdown immediately
  stopCountdown();

  if (hash === '#/join') {
    showScreen('join-screen');
    setTimeout(() => {
      const input = document.getElementById('name-input');
      if (input) input.focus();
    }, 80);
    return;
  }

  if (hash === '#/lobby') {
    if (myName) {
      showScreen('lobby-screen');
    } else {
      navigate('#/join');
    }
    return;
  }

  // Default: welcome / landing screen (e.g. '#/' or '#/home')
  showScreen('welcome-screen');
}

window.addEventListener('hashchange', handleRouting);

// ---------------------------------------------------------------------------
// PRE-JOIN & JOIN BUTTON LISTENERS (No sounds on UI navigation/lobby)
// ---------------------------------------------------------------------------
const welcomeEnterBtn = document.getElementById('welcome-enter-btn');
const joinBackNav = document.getElementById('join-back-nav');
const lobbyBackNav = document.getElementById('lobby-back-nav');
const lobbyChangeNameBtn = document.getElementById('lobby-change-name-btn');
const joinSubmitBtn = document.getElementById('join-submit-btn');
const nameInput = document.getElementById('name-input');
const joinError = document.getElementById('join-error');
const siteNavLink = document.querySelector('.site-nav-link');

if (siteNavLink) {
  siteNavLink.addEventListener('click', (e) => {
    e.preventDefault();
    navigate('#/');
  });
}

welcomeEnterBtn.addEventListener('click', () => {
  if (myName) {
    navigate('#/lobby');
  } else {
    navigate('#/join');
  }
});

joinBackNav.addEventListener('click', () => {
  navigate('#/');
});

lobbyBackNav.addEventListener('click', () => {
  navigate('#/');
});

lobbyChangeNameBtn.addEventListener('click', () => {
  navigate('#/join');
});

joinSubmitBtn.addEventListener('click', doJoin);
nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doJoin();
});

function doJoin() {
  const raw = nameInput.value.trim();
  if (!raw) {
    joinError.textContent = 'Please enter your name or alias';
    return;
  }
  joinError.textContent = '';
  socket.emit('join', { name: raw });
}

socket.on('join:error', (msg) => {
  joinError.textContent = msg;
});

socket.on('joined', ({ name }) => {
  myName = name;
  localStorage.setItem('gritin_player_name', myName);

  document.getElementById('lobby-welcome-name').textContent = myName;
  document.getElementById('lobby-user-initials').textContent = getInitials(myName);

  const hash = window.location.hash || '#/';
  if (hash === '#/join') {
    navigate('#/lobby');
  } else {
    handleRouting();
  }
});

// Auto-reconnect if name was previously saved
socket.on('connect', () => {
  if (myName) {
    socket.emit('join', { name: myName });
  }
});

// ---------------------------------------------------------------------------
// PLAYERS UPDATE
// ---------------------------------------------------------------------------
socket.on('players:update', ({ count }) => {
  const el = document.getElementById('lobby-player-count');
  if (el) el.textContent = count;
});

// ---------------------------------------------------------------------------
// LOBBY RENDERING
// ---------------------------------------------------------------------------
function renderLobbyGames(games, activeGameId) {
  const container = document.getElementById('lobby-games-list');
  if (!container || !games) return;

  container.innerHTML = games.map((g, index) => {
    const isActive = g.id === activeGameId;
    const tileClass = isActive ? 'game-tile active' : 'game-tile locked';
    const pillClass = isActive ? 'game-status-pill live' : 'game-status-pill locked';
    const pillText = isActive ? 'Live Now' : 'Up Next';

    return `
      <div class="${tileClass}">
        <div class="game-num-badge">${index + 1}</div>
        <div class="game-info">
          <div class="game-title-row">
            <span class="game-title">${escapeHtml(g.title)}</span>
            <span class="${pillClass}">${pillText}</span>
          </div>
          <div class="game-sub">${escapeHtml(g.tagline)} (${g.roundCount} Rounds)</div>
        </div>
      </div>
    `;
  }).join('');
}

// ---------------------------------------------------------------------------
// SESSION STATE (Server Driven)
// ---------------------------------------------------------------------------
socket.on('session:update', (payload) => {
  currentServerPhase = payload.phase;
  if (typeof payload.audioEnabled === 'boolean') {
    setAudioEnabled(payload.audioEnabled);
  }

  if (payload.phase === 'lobby') {
    stopCountdown();
    currentRound = null;
    answeredThisRound = false;

    renderLobbyGames(payload.games, payload.activeGameId);
    const statusTextEl = document.getElementById('lobby-status-text');
    if (statusTextEl) {
      const setName = (payload.activeSetId || 'set1').replace('set', 'Set ');
      statusTextEl.textContent = `Host is preparing ${payload.activeGameTitle} (${setName})...`;
    }

    const currentHash = window.location.hash || '#/';
    if (currentHash === '#/lobby' || (currentHash !== '#/' && currentHash !== '#/join')) {
      if (myName) {
        showScreen('lobby-screen');
        if (window.location.hash !== '#/lobby') {
          window.location.hash = '#/lobby';
        }
      } else {
        navigate('#/join');
      }
    } else {
      handleRouting();
    }
    return;
  }

  if (payload.phase === 'startingCountdown') {
    stopCountdown();
    // Pre-cache first round image during the 3.5-second countdown
    if (payload.firstRoundImage) {
      const preloadImg = new Image();
      preloadImg.src = payload.firstRoundImage;
    }

    const numEl = document.getElementById('player-countdown-num');
    const gameEl = document.getElementById('player-countdown-game');
    if (gameEl) gameEl.textContent = `${payload.gameTitle} • ${(payload.setId || 'set1').toUpperCase()}`;

    const tickStart = () => {
      const remaining = Math.max(0, Math.ceil((payload.startsAt - Date.now()) / 1000));
      if (numEl) {
        if (remaining > 0) {
          numEl.textContent = remaining;
          numEl.style.transform = 'scale(1.15)';
          setTimeout(() => { if (numEl) numEl.style.transform = 'scale(1)'; }, 100);
          soundUrgentTick();
        } else {
          numEl.textContent = 'GO!';
          numEl.style.color = 'var(--emerald)';
        }
      }
    };
    tickStart();
    countdownInterval = setInterval(tickStart, 300);
    showScreen('countdown-screen');
    return;
  }

  if (payload.phase === 'round') {
    stopCountdown();
    if (!currentRound || currentRound.roundIndex !== payload.roundIndex || currentRound.gameId !== payload.gameId) {
      currentRound = payload;
      answeredThisRound = false;
      renderRound(payload);
    }
    startCountdown(payload.roundEndsAt);
    showScreen('round-screen');
    return;
  }

  if (payload.phase === 'roundResult') {
    stopCountdown();
    // Pre-cache upcoming round image during the 6-second reveal break
    if (payload.nextRoundImage) {
      const preloadNext = new Image();
      preloadNext.src = payload.nextRoundImage;
    }
    renderResultScreen(payload, false);
    showScreen('result-screen');
    return;
  }

  if (payload.phase === 'gameEnded') {
    stopCountdown();
    renderResultScreen(payload, true);
    showScreen('result-screen');
    return;
  }
});

// ---------------------------------------------------------------------------
// ROUND SCREEN RENDERING
// ---------------------------------------------------------------------------
function renderRound(round) {
  document.getElementById('round-game-badge').textContent = round.gameTitle || 'Challenge';
  document.getElementById('round-counter-pill').textContent = `Round ${round.roundIndex + 1} of ${round.totalRounds}`;
  document.getElementById('round-prompt-text').textContent = round.label;
  document.getElementById('round-subtitle-text').textContent = round.subtitle || 'Fastest correct answer scores highest';
  document.getElementById('round-locked-banner').classList.add('hidden');

  // Media container
  const mediaContainer = document.getElementById('round-media-container');
  mediaContainer.innerHTML = '';
  mediaContainer.classList.add('hidden');

  if (round.image) {
    mediaContainer.classList.remove('hidden');
    mediaContainer.classList.add('has-image');
    mediaContainer.innerHTML = `<img class="round-image-el" src="${round.image}" alt="Round visual" />`;
  } else if (round.snippet) {
    mediaContainer.classList.remove('has-image');
    mediaContainer.classList.remove('hidden');
    if (round.mediaType === 'code') {
      mediaContainer.innerHTML = `<pre class="code-media-box"><code>${escapeHtml(round.snippet)}</code></pre>`;
    } else {
      mediaContainer.innerHTML = `<div class="quote-media-box">${escapeHtml(round.snippet)}</div>`;
    }
  }

  // Options grid (No emojis, No arrows)
  const optsContainer = document.getElementById('round-options-grid');
  const isBinary = round.options.length === 2 && round.options[0] === 'AI Generated';

  if (isBinary) {
    optsContainer.className = 'options-container binary-grid';
    optsContainer.innerHTML = round.options.map((opt, i) => `
      <button class="option-btn binary-btn" data-idx="${i}">
        <span>${escapeHtml(opt)}</span>
      </button>
    `).join('');
  } else {
    optsContainer.className = 'options-container';
    optsContainer.innerHTML = round.options.map((opt, i) => `
      <button class="option-btn" data-idx="${i}">
        <span>${escapeHtml(opt)}</span>
        <span style="font-size: 11px; opacity: 0.5;">Option ${i + 1}</span>
      </button>
    `).join('');
  }

  optsContainer.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectAnswer(parseInt(btn.dataset.idx, 10));
    });
  });
}

function selectAnswer(choiceIdx) {
  if (answeredThisRound) return;
  answeredThisRound = true;
  soundClick();

  document.querySelectorAll('#round-options-grid .option-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === choiceIdx) btn.classList.add('selected');
  });

  document.getElementById('round-locked-banner').classList.remove('hidden');
  socket.emit('answer', choiceIdx);
}

// ---------------------------------------------------------------------------
// COUNTDOWN TIMER
// ---------------------------------------------------------------------------
function startCountdown(endsAt) {
  stopCountdown();
  const dial = document.getElementById('round-timer-dial');

  const tick = () => {
    // Immediately kill countdown and ticking audio if no longer in round phase
    if (currentServerPhase !== 'round') {
      stopCountdown();
      return;
    }

    const remaining = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
    if (dial) dial.textContent = remaining;

    if (remaining <= 3 && remaining > 0) {
      if (dial) dial.classList.add('urgent');
      soundUrgentTick();
    } else {
      if (dial) dial.classList.remove('urgent');
      if (remaining > 0) soundTick();
    }

    if (remaining <= 0) {
      stopCountdown();
    }
  };

  tick();
  countdownInterval = setInterval(tick, 250);
}

function stopCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  const dial = document.getElementById('round-timer-dial');
  if (dial) dial.classList.remove('urgent');
}

// ---------------------------------------------------------------------------
// PERSONAL ROUND FEEDBACK
// ---------------------------------------------------------------------------
socket.on('round:personal-result', (result) => {
  const feedbackCard = document.getElementById('personal-feedback-card');
  const iconBadge = document.getElementById('feedback-badge-icon');
  const headEl = document.getElementById('feedback-headline');
  const subEl = document.getElementById('feedback-sub');

  if (!result.answered) {
    feedbackCard.className = 'personal-feedback-card wrong';
    iconBadge.textContent = '!';
    headEl.textContent = "Time expired: 0 PTS";
    subEl.textContent = `Correct answer: ${result.correctAnswerText}`;
    soundWrong();
  } else if (result.isCorrect) {
    feedbackCard.className = 'personal-feedback-card correct';
    iconBadge.textContent = '✓';
    headEl.textContent = `+${result.pointsEarned} PTS`;
    subEl.innerHTML = `Answered in <strong>${result.speedSeconds}s</strong> : Rank ${result.roundRank} fastest answer`;
    soundCorrect();
  } else {
    feedbackCard.className = 'personal-feedback-card wrong';
    iconBadge.textContent = 'X';
    headEl.textContent = 'Incorrect: 0 PTS';
    subEl.textContent = `Correct answer: ${result.correctAnswerText}`;
    soundWrong();
  }

  feedbackCard.classList.remove('hidden');
});

// ---------------------------------------------------------------------------
// RESULT SCREEN RENDERING
// ---------------------------------------------------------------------------
function renderResultScreen(payload, isFinal) {
  const titleEl = document.getElementById('result-screen-title');
  const subEl = document.getElementById('result-screen-subtitle');
  const nextTextEl = document.getElementById('result-next-text');
  const explBox = document.getElementById('round-explanation-box');
  const explText = document.getElementById('round-explanation-text');

  if (isFinal) {
    titleEl.textContent = `Final Results: ${payload.gameTitle}`;
    subEl.textContent = 'Game complete. Top scorers for this challenge:';
    nextTextEl.textContent = 'Returning to lobby soon...';
  } else {
    titleEl.textContent = `Round ${payload.roundIndex + 1} Results`;
    subEl.textContent = 'Current Leaderboard Standings';
    
    // Live countdown to next round
    const updateNextTimer = () => {
      if (currentServerPhase !== 'roundResult') return;
      const remaining = Math.max(0, Math.ceil((payload.resultUntil - Date.now()) / 1000));
      nextTextEl.innerHTML = `Next round begins in <strong class="countdown-highlight">${remaining}s</strong>...`;
    };
    updateNextTimer();
    countdownInterval = setInterval(updateNextTimer, 300);
  }

  if (payload.explanation) {
    explBox.classList.remove('hidden');
    explText.textContent = payload.explanation;
  } else {
    explBox.classList.add('hidden');
  }

  const listEl = document.getElementById('result-lb-list');
  const lb = payload.leaderboard || [];

  if (lb.length === 0) {
    listEl.innerHTML = '<div class="empty-state">No scores registered yet.</div>';
  } else {
    listEl.innerHTML = lb.map((r, i) => {
      const isMe = r.name === myName ? ' me' : '';
      let rankClass = 'lb-rank-num';
      if (i === 0) rankClass += ' rank-1';
      else if (i === 1) rankClass += ' rank-2';
      else if (i === 2) rankClass += ' rank-3';

      return `
        <div class="lb-card${isMe}">
          <div class="lb-left">
            <span class="${rankClass}">${i + 1}</span>
            <span class="lb-initials">${r.initials || getInitials(r.name)}</span>
            <span class="lb-name">${escapeHtml(r.name)}</span>
          </div>
          <span class="lb-score-val">${r.score} pts</span>
        </div>
      `;
    }).join('');
  }
}

// Initial setup
if (myName) {
  const input = document.getElementById('name-input');
  if (input) input.value = myName;
  const nameEl = document.getElementById('lobby-welcome-name');
  if (nameEl) nameEl.textContent = myName;
  const initialsEl = document.getElementById('lobby-user-initials');
  if (initialsEl) initialsEl.textContent = getInitials(myName);
}
handleRouting();
