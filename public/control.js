const socket = io({
  transports: ['websocket', 'polling']
});

// ---------------------------------------------------------------------------
// AUTHENTICATION & LOCK DECK
// ---------------------------------------------------------------------------
const authScreen = document.getElementById('control-auth-screen');
const deckScreen = document.getElementById('control-deck-screen');
const authForm = document.getElementById('control-auth-form');
const authInput = document.getElementById('control-passcode-input');
const authError = document.getElementById('control-auth-error');
const logoutBtn = document.getElementById('ctrl-logout-btn');

let isAuthenticated = false;
let totalPlayerCount = 0;
let currentSessionPayload = null;
let activeGameId = 'game1';
let activeSetId = 'set1';
let ctrlCountdown = null;

function showDeck() {
  isAuthenticated = true;
  authScreen.classList.add('hidden');
  deckScreen.classList.remove('hidden');
}

function showAuth(errorMessage = '') {
  isAuthenticated = false;
  sessionStorage.removeItem('gritin_host_passcode');
  authScreen.classList.remove('hidden');
  deckScreen.classList.add('hidden');
  if (errorMessage) {
    authError.textContent = errorMessage;
  }
}

authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const pw = (authInput.value || '').trim();
  if (!pw) return;

  authError.textContent = '';
  socket.emit('host:auth', { password: pw }, (res) => {
    if (res && res.success) {
      sessionStorage.setItem('gritin_host_passcode', pw);
      showDeck();
    } else {
      authError.textContent = (res && res.error) || 'Invalid passcode. Access denied.';
    }
  });
});

logoutBtn.addEventListener('click', () => {
  showAuth('Command center locked.');
});

// Show/Hide password toggle
const eyeBtn = document.getElementById('auth-eye-btn');
const eyeText = document.getElementById('auth-eye-text');
if (eyeBtn && authInput) {
  eyeBtn.addEventListener('click', () => {
    const isPass = authInput.type === 'password';
    authInput.type = isPass ? 'text' : 'password';
    if (eyeText) eyeText.textContent = isPass ? 'Hide' : 'Show';
  });
}

// Auto-login from sessionStorage if available
const savedPasscode = sessionStorage.getItem('gritin_host_passcode');
if (savedPasscode) {
  socket.emit('host:auth', { password: savedPasscode }, (res) => {
    if (res && res.success) {
      showDeck();
    } else {
      showAuth();
    }
  });
}

// ---------------------------------------------------------------------------
// AUDIO TOGGLE
// ---------------------------------------------------------------------------
let audioEnabled = true;
const audioBtn = document.getElementById('ctrl-audio-toggle');

function updateAudioBtnUI(enabled) {
  audioEnabled = Boolean(enabled);
  if (audioBtn) {
    audioBtn.textContent = audioEnabled ? 'Audio: On' : 'Audio: Off';
    audioBtn.classList.toggle('muted', !audioEnabled);
  }
}

if (audioBtn) {
  audioBtn.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    updateAudioBtnUI(audioEnabled);
    socket.emit('host:set-audio', audioEnabled);
  });
}

socket.on('audio:state', (enabled) => {
  updateAudioBtnUI(enabled);
});

// ---------------------------------------------------------------------------
// GAME & SET SELECTION HANDLERS
// ---------------------------------------------------------------------------
const gameButtons = ['game1', 'game2', 'game3'].map(id => document.getElementById(`ctrl-tab-${id}`));
const setButtons = ['set1', 'set2', 'set3', 'set4', 'set5'].map(id => document.getElementById(`ctrl-set-${id}`));

const gameTitles = {
  game1: 'Nature Guess',
  game2: 'Tech & AI Quiz',
  game3: 'AI or Human?'
};

gameButtons.forEach(btn => {
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (!currentSessionPayload || currentSessionPayload.phase === 'lobby') {
      const gid = btn.dataset.game;
      activeGameId = gid;
      updateSelectedGameUI(gid);
      socket.emit('host:select-game', gid);
    }
  });
});

setButtons.forEach(btn => {
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (!currentSessionPayload || currentSessionPayload.phase === 'lobby') {
      const sid = btn.dataset.set;
      activeSetId = sid;
      updateSelectedSetUI(sid);
      socket.emit('host:select-set', sid);
    }
  });
});

function updateSelectedGameUI(gid) {
  activeGameId = gid;
  gameButtons.forEach(btn => {
    if (btn) btn.classList.toggle('active', btn.dataset.game === gid);
  });
  const label = document.getElementById('ctrl-active-game-label');
  if (label) label.textContent = gameTitles[gid] || gid;
}

function updateSelectedSetUI(sid) {
  activeSetId = sid;
  setButtons.forEach(btn => {
    if (btn) btn.classList.toggle('active', btn.dataset.set === sid);
  });
  const label = document.getElementById('ctrl-active-set-label');
  if (label) {
    const setNum = sid.replace('set', 'Set ');
    label.textContent = `${setNum} Active (15 Questions)`;
  }
}

// ---------------------------------------------------------------------------
// PLAYERS & ROSTER UPDATE
// ---------------------------------------------------------------------------
function escapeHtml(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function getInitials(name) {
  if (!name) return 'GA';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

socket.on('players:update', ({ players, count }) => {
  totalPlayerCount = count;
  const pCount = document.getElementById('ctrl-players-count');
  const rCount = document.getElementById('ctrl-roster-count');
  if (pCount) pCount.textContent = count;
  if (rCount) rCount.textContent = count;

  const rosterList = document.getElementById('ctrl-roster-list');
  if (rosterList) {
    if (!players || players.length === 0) {
      rosterList.innerHTML = '<div class="empty-state">No players connected yet</div>';
    } else {
      rosterList.innerHTML = players.map(p => `
        <div class="host-roster-chip">
          <span class="host-lb-initials" style="width: 22px; height: 22px; font-size: 10px;">${p.initials || getInitials(p.name)}</span>
          <span>${escapeHtml(p.name)}</span>
        </div>
      `).join('');
    }
  }
});

// Refresh button
const refreshBtn = document.getElementById('ctrl-refresh-roster');
if (refreshBtn) {
  refreshBtn.addEventListener('click', () => {
    socket.emit('host:get-state');
  });
}

// ---------------------------------------------------------------------------
// LIVE SUBMISSION METER
// ---------------------------------------------------------------------------
socket.on('answered:count', (answeredCount) => {
  const label = document.getElementById('ctrl-meter-label');
  const fill = document.getElementById('ctrl-meter-fill');
  if (label && fill) {
    label.textContent = `${answeredCount} / ${totalPlayerCount} answered`;
    const pct = totalPlayerCount > 0 ? Math.min(100, Math.round((answeredCount / totalPlayerCount) * 100)) : 0;
    fill.style.width = `${pct}%`;
  }
});

// ---------------------------------------------------------------------------
// SESSION UPDATE & CONTROL DECK RENDERING
// ---------------------------------------------------------------------------
socket.on('session:update', (payload) => {
  currentSessionPayload = payload;

  if (typeof payload.audioEnabled === 'boolean') {
    updateAudioBtnUI(payload.audioEnabled);
  }
  if (payload.activeGameId) {
    updateSelectedGameUI(payload.activeGameId);
  }
  if (payload.activeSetId) {
    updateSelectedSetUI(payload.activeSetId);
  }

  const phaseTag = document.getElementById('ctrl-phase-tag');
  const timerSmall = document.getElementById('ctrl-timer-small');
  const summaryTitle = document.getElementById('ctrl-summary-title');
  const summaryDetail = document.getElementById('ctrl-summary-detail');
  const buttonsDeck = document.getElementById('ctrl-buttons-deck');
  const lockedHint = document.getElementById('ctrl-set-locked-hint');

  stopTimer();

  const isLobby = payload.phase === 'lobby';
  // Enable or disable set buttons
  setButtons.forEach(btn => {
    if (btn) btn.disabled = !isLobby;
  });
  gameButtons.forEach(btn => {
    if (btn) btn.disabled = !isLobby;
  });

  if (lockedHint) {
    lockedHint.textContent = isLobby
      ? 'Question sets can be changed while in the Lobby arena.'
      : 'Game in progress: Question set and game selection are locked.';
    lockedHint.style.color = isLobby ? 'rgba(255,255,255,0.45)' : 'var(--gold)';
  }

  // 1. LOBBY PHASE
  if (payload.phase === 'lobby') {
    if (phaseTag) phaseTag.textContent = 'PHASE: LOBBY STANDBY';
    if (timerSmall) timerSmall.classList.add('hidden');

    const formattedSet = (payload.activeSetId || activeSetId).replace('set', 'Set ');
    const gameName = gameTitles[payload.activeGameId || activeGameId] || 'Selected Game';

    if (summaryTitle) summaryTitle.textContent = `Ready: ${gameName} (${formattedSet})`;
    if (summaryDetail) summaryDetail.textContent = `Click Launch below when all ${totalPlayerCount} assembled players are ready to start.`;

    if (buttonsDeck) {
      buttonsDeck.innerHTML = `
        <button class="btn btn-primary btn-large" id="ctrl-start-btn" style="padding: 16px 28px; font-size: 17px; width: 100%;">
          <span>Launch ${escapeHtml(gameName)} (${formattedSet})</span>
        </button>
      `;

      document.getElementById('ctrl-start-btn').addEventListener('click', () => {
        socket.emit('host:start-game', {
          gameId: activeGameId,
          setId: activeSetId
        });
      });
    }
    return;
  }

  // 2. ROUND ACTIVE PHASE
  if (payload.phase === 'round') {
    const formattedSet = (payload.setId || activeSetId).replace('set', 'Set ');
    if (phaseTag) phaseTag.textContent = `PHASE: ROUND ${payload.roundIndex + 1} OF ${payload.totalRounds} (${formattedSet})`;
    if (timerSmall) timerSmall.classList.remove('hidden');

    if (summaryTitle) summaryTitle.textContent = payload.label;
    if (summaryDetail) summaryDetail.textContent = payload.subtitle || `Challenge ${payload.roundIndex + 1} is live on player and projector screens.`;

    if (buttonsDeck) {
      buttonsDeck.innerHTML = `
        <button class="btn btn-warning" id="ctrl-skip-btn" style="padding: 14px 22px; font-size: 15px;">
          <span>Reveal Results Early (Skip Round)</span>
        </button>
        <button class="btn btn-ghost-danger" id="ctrl-abort-btn" style="padding: 14px 22px; font-size: 15px;">
          <span>Abort to Lobby</span>
        </button>
      `;

      document.getElementById('ctrl-skip-btn').addEventListener('click', () => {
        socket.emit('host:skip-round');
      });
      document.getElementById('ctrl-abort-btn').addEventListener('click', () => {
        if (confirm('Return immediately to lobby and abort this round?')) {
          socket.emit('host:return-lobby');
        }
      });
    }

    startTimer(payload.roundEndsAt);
    return;
  }

  // 3. ROUND RESULT PHASE
  if (payload.phase === 'roundResult') {
    if (phaseTag) phaseTag.textContent = `PHASE: ROUND ${payload.roundIndex + 1} REVEAL`;
    if (timerSmall) timerSmall.classList.remove('hidden');

    if (summaryTitle) {
      summaryTitle.innerHTML = `<span style="color: var(--emerald);">✓ Correct: ${escapeHtml(payload.correctAnswerText)}</span>`;
    }
    if (summaryDetail) {
      summaryDetail.textContent = payload.isFinal
        ? 'Final challenge concluded. Displaying podium standings shortly.'
        : `Advancing to Round ${payload.roundIndex + 2} in a few seconds.`;
    }

    if (buttonsDeck) {
      buttonsDeck.innerHTML = `
        <button class="btn btn-ghost" id="ctrl-lobby-btn" style="padding: 12px 20px;">
          <span>Return to Lobby</span>
        </button>
      `;

      document.getElementById('ctrl-lobby-btn').addEventListener('click', () => {
        socket.emit('host:return-lobby');
      });
    }

    startTimer(payload.resultUntil);
    return;
  }

  // 4. GAME ENDED PHASE
  if (payload.phase === 'gameEnded') {
    if (phaseTag) phaseTag.textContent = 'PHASE: SESSION FINISHED';
    if (timerSmall) timerSmall.classList.add('hidden');

    const topWinner = payload.leaderboard && payload.leaderboard[0];
    if (summaryTitle) {
      summaryTitle.textContent = topWinner
        ? `Grand Champion: ${topWinner.name} (${topWinner.score} pts)`
        : 'Game Session Concluded';
    }
    if (summaryDetail) {
      summaryDetail.textContent = 'Final leaderboard broadcasted. You can return to lobby to play another set or reset scores.';
    }

    if (buttonsDeck) {
      buttonsDeck.innerHTML = `
        <button class="btn btn-primary" id="ctrl-end-lobby-btn" style="padding: 14px 24px; font-size: 16px;">
          <span>Return to Lobby</span>
        </button>
        <button class="btn btn-ghost-danger" id="ctrl-reset-btn" style="padding: 14px 24px; font-size: 16px;">
          <span>Reset Scores</span>
        </button>
      `;

      document.getElementById('ctrl-end-lobby-btn').addEventListener('click', () => {
        socket.emit('host:return-lobby');
      });
      document.getElementById('ctrl-reset-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all player scores for this challenge?')) {
          socket.emit('host:reset-scores');
        }
      });
    }
  }
});

// ---------------------------------------------------------------------------
// COUNTDOWN TIMER FOR HOST CONTROL
// ---------------------------------------------------------------------------
function startTimer(endsAt) {
  stopTimer();
  const timerEl = document.getElementById('ctrl-timer-small');
  if (!timerEl) return;

  const tick = () => {
    const remaining = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
    timerEl.textContent = `${remaining}s`;
    if (remaining <= 3 && remaining > 0) {
      timerEl.classList.add('urgent');
    } else {
      timerEl.classList.remove('urgent');
    }
  };

  tick();
  ctrlCountdown = setInterval(tick, 250);
}

function stopTimer() {
  if (ctrlCountdown) clearInterval(ctrlCountdown);
  ctrlCountdown = null;
  const timerEl = document.getElementById('ctrl-timer-small');
  if (timerEl) timerEl.classList.remove('urgent');
}

// Auto-reconnect authentication
socket.on('connect', () => {
  const token = sessionStorage.getItem('gritin_host_passcode');
  if (token) {
    socket.emit('host:auth', { password: token }, (res) => {
      if (res && res.success) {
        showDeck();
      }
    });
  }
});
