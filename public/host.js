const socket = io();

// ---------------------------------------------------------------------------
// PROCEDURAL AUDIO ENGINE FOR HOST
// ---------------------------------------------------------------------------
let audioEnabled = true;
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playHostTone(freq, type = 'sine', duration = 0.15, gainVal = 0.12) {
  if (!audioEnabled) return;
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

function soundTick() {
  playHostTone(800, 'sine', 0.04, 0.04);
}

function soundUrgentTick() {
  playHostTone(1200, 'triangle', 0.08, 0.08);
}

function soundFanfare() {
  if (!audioEnabled) return;
  try {
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((f, i) => setTimeout(() => playHostTone(f, 'triangle', 0.3, 0.15), i * 90));
  } catch (e) {}
}

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
// HOST STATE & CONTROLS
// ---------------------------------------------------------------------------
let totalPlayerCount = 0;
let currentPayload = null;
let countdownTimer = null;
let activeGameTab = 'game1';

// Fullscreen
const fsBtn = document.getElementById('host-fullscreen-btn');
fsBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
    fsBtn.textContent = 'Exit Fullscreen';
  } else {
    document.exitFullscreen().catch(() => {});
    fsBtn.textContent = 'Fullscreen';
  }
});

// Audio toggle
const audioBtn = document.getElementById('host-audio-toggle');
audioBtn.addEventListener('click', () => {
  audioEnabled = !audioEnabled;
  audioBtn.textContent = audioEnabled ? 'Audio: On' : 'Audio: Off';
});

// Sidebar Tabs: Leaderboard vs Roster
const tabLb = document.getElementById('tab-show-lb');
const tabRoster = document.getElementById('tab-show-roster');
const listLb = document.getElementById('host-lb-list');
const listRoster = document.getElementById('host-roster-list');

tabLb.addEventListener('click', () => {
  tabLb.classList.add('active');
  tabRoster.classList.remove('active');
  listLb.classList.remove('hidden');
  listRoster.classList.add('hidden');
});

tabRoster.addEventListener('click', () => {
  tabRoster.classList.add('active');
  tabLb.classList.remove('active');
  listRoster.classList.remove('hidden');
  listLb.classList.add('hidden');
});

// Game Selector Tabs
['game1', 'game2', 'game3'].forEach(id => {
  const tab = document.getElementById(`tab-${id}`);
  if (tab) {
    tab.addEventListener('click', () => {
      activeGameTab = id;
      updateGameTabs(id);
      socket.emit('host:select-game', id);
    });
  }
});

function updateGameTabs(activeId) {
  ['game1', 'game2', 'game3'].forEach(id => {
    const tab = document.getElementById(`tab-${id}`);
    if (tab) tab.classList.toggle('active', id === activeId);
  });
}

// ---------------------------------------------------------------------------
// PLAYERS UPDATE
// ---------------------------------------------------------------------------
socket.on('players:update', ({ players, count }) => {
  totalPlayerCount = count;
  document.getElementById('host-players-count').textContent = count;
  document.getElementById('host-roster-count').textContent = count;

  if (!players || players.length === 0) {
    listRoster.innerHTML = '<div class="empty-state">No players connected yet</div>';
  } else {
    listRoster.innerHTML = players.map(p => `
      <div class="host-roster-chip">
        <span class="host-lb-initials" style="width: 22px; height: 22px; font-size: 10px;">${p.initials || getInitials(p.name)}</span>
        <span>${escapeHtml(p.name)}</span>
      </div>
    `).join('');
  }
});

// ---------------------------------------------------------------------------
// ANSWER SUBMISSION METER
// ---------------------------------------------------------------------------
socket.on('answered:count', (answeredCount) => {
  const label = document.getElementById('host-meter-label');
  const fill = document.getElementById('host-meter-fill');
  if (label && fill) {
    label.textContent = `${answeredCount} / ${totalPlayerCount} answered`;
    const pct = totalPlayerCount > 0 ? Math.min(100, Math.round((answeredCount / totalPlayerCount) * 100)) : 0;
    fill.style.width = `${pct}%`;
  }
});

// ---------------------------------------------------------------------------
// SESSION UPDATE
// ---------------------------------------------------------------------------
socket.on('session:update', (payload) => {
  currentPayload = payload;
  if (payload.activeGameId) {
    activeGameTab = payload.activeGameId;
    updateGameTabs(payload.activeGameId);
  }

  const stageTag = document.getElementById('host-stage-tag');
  const timerBig = document.getElementById('host-timer-big');
  const stageContent = document.getElementById('host-stage-content');
  const responseMeter = document.getElementById('host-response-meter');
  const controlsDeck = document.getElementById('host-controls-deck');

  stopCountdown();

  if (payload.phase === 'lobby') {
    stageTag.textContent = 'LOBBY ARENA';
    timerBig.classList.add('hidden');
    responseMeter.classList.add('hidden');

    stageContent.innerHTML = `
      <div style="text-align: center; padding: 24px 0;">
        <h1 class="host-question-display">Ready for ${escapeHtml(payload.activeGameTitle)}</h1>
        <p class="host-question-sub">Select challenge from the top navigation and click Launch when players are assembled.</p>
        <div style="display: flex; justify-content: center; gap: 16px; margin-top: 24px;">
          <div style="background: rgba(255,255,255,0.06); padding: 18px 28px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.1);">
            <div style="font-size: 32px; font-weight: 800; color: var(--blue);">${totalPlayerCount}</div>
            <div style="font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 4px;">PLAYERS READY</div>
          </div>
        </div>
      </div>
    `;

    controlsDeck.innerHTML = `
      <button class="btn btn-primary" id="host-start-btn" style="padding: 18px 32px; font-size: 18px;">
        <span>Launch ${escapeHtml(payload.activeGameTitle)}</span>
      </button>
    `;

    document.getElementById('host-start-btn').addEventListener('click', () => {
      socket.emit('host:start-game', activeGameTab);
    });
    return;
  }

  if (payload.phase === 'round') {
    stageTag.textContent = `${payload.gameTitle.toUpperCase()} : ROUND ${payload.roundIndex + 1} OF ${payload.totalRounds}`;
    timerBig.classList.remove('hidden');
    responseMeter.classList.remove('hidden');

    let mediaHtml = '';
    if (payload.image) {
      mediaHtml = `
        <div class="host-media-container">
          <img class="host-media-img" src="${payload.image}" alt="Round prompt visual" />
        </div>
      `;
    } else if (payload.snippet) {
      if (payload.mediaType === 'code') {
        mediaHtml = `<pre class="code-media-box" style="font-size: 15px; padding: 22px; max-height: 280px; margin-bottom: 24px;"><code>${escapeHtml(payload.snippet)}</code></pre>`;
      } else {
        mediaHtml = `<div class="quote-media-box" style="font-size: 24px; padding: 28px; margin-bottom: 24px;">${escapeHtml(payload.snippet)}</div>`;
      }
    }

    stageContent.innerHTML = `
      <div class="host-question-display">${escapeHtml(payload.label)}</div>
      ${payload.subtitle ? `<div class="host-question-sub">${escapeHtml(payload.subtitle)}</div>` : ''}
      ${mediaHtml}
    `;

    controlsDeck.innerHTML = `
      <button class="btn" id="host-skip-btn" style="background: rgba(255,255,255,0.14); color: #fff;">
        <span>Reveal Results Early</span>
      </button>
      <button class="btn" id="host-abort-btn" style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.7);">
        <span>Return to Lobby</span>
      </button>
    `;

    document.getElementById('host-skip-btn').addEventListener('click', () => {
      socket.emit('host:skip-round');
    });
    document.getElementById('host-abort-btn').addEventListener('click', () => {
      socket.emit('host:return-lobby');
    });

    startCountdown(payload.roundEndsAt);
    return;
  }

  if (payload.phase === 'roundResult') {
    stageTag.textContent = `${payload.gameTitle.toUpperCase()} : ROUND ${payload.roundIndex + 1} REVEAL`;
    timerBig.classList.remove('hidden');
    responseMeter.classList.add('hidden');

    renderHostLeaderboard(payload.leaderboard);

    stageContent.innerHTML = `
      <div style="padding: 12px 0;">
        <div style="font-size: 13px; font-weight: 800; color: var(--emerald); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">Correct Answer</div>
        <div class="host-question-display" style="color: var(--emerald); margin-bottom: 18px;">
          ✓ ${escapeHtml(payload.correctAnswerText)}
        </div>
        ${payload.explanation ? `
          <div class="insight-box" style="background: rgba(255,255,255,0.06); border-left-color: var(--emerald); color: #FFFFFF; font-size: 16px; padding: 20px 24px;">
            <div class="insight-label" style="color: var(--emerald);">Context &amp; Insight</div>
            ${escapeHtml(payload.explanation)}
          </div>
        ` : ''}
      </div>
    `;

    controlsDeck.innerHTML = `
      <button class="btn" id="host-lobby-btn" style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.8);">
        <span>Return to Lobby</span>
      </button>
    `;

    document.getElementById('host-lobby-btn').addEventListener('click', () => {
      socket.emit('host:return-lobby');
    });

    startCountdown(payload.resultUntil);
    return;
  }

  if (payload.phase === 'gameEnded') {
    stageTag.textContent = `${payload.gameTitle.toUpperCase()} : FINAL RESULTS`;
    timerBig.classList.add('hidden');
    responseMeter.classList.add('hidden');

    soundFanfare();
    renderHostLeaderboard(payload.leaderboard);

    const winner = payload.leaderboard && payload.leaderboard[0];
    stageContent.innerHTML = `
      <div style="text-align: center; padding: 32px 0;">
        <h1 class="host-question-display">Winner: ${winner ? escapeHtml(winner.name) : 'Session Completed'}</h1>
        <p class="host-question-sub">Top Score: ${winner ? winner.score : 0} points</p>
      </div>
    `;

    controlsDeck.innerHTML = `
      <button class="btn btn-primary" id="host-finish-lobby-btn">
        <span>Return to Lobby</span>
      </button>
      <button class="btn" id="host-reset-btn" style="background: rgba(220,38,38,0.2); color: #FCA5A5; border: 1px solid rgba(220,38,38,0.4);">
        <span>Reset Scores</span>
      </button>
    `;

    document.getElementById('host-finish-lobby-btn').addEventListener('click', () => {
      socket.emit('host:return-lobby');
    });
    document.getElementById('host-reset-btn').addEventListener('click', () => {
      if (confirm('Reset scores for this game?')) {
        socket.emit('host:reset-scores');
      }
    });
  }
});

// ---------------------------------------------------------------------------
// LEADERBOARD RENDER
// ---------------------------------------------------------------------------
function renderHostLeaderboard(leaderboard) {
  const lb = leaderboard || [];
  if (lb.length === 0) {
    listLb.innerHTML = '<div class="empty-state">No scores registered yet</div>';
    return;
  }

  listLb.innerHTML = lb.slice(0, 10).map((r, i) => {
    let topClass = '';
    if (i === 0) topClass = ' top1';
    else if (i === 1) topClass = ' top2';
    else if (i === 2) topClass = ' top3';

    return `
      <div class="host-lb-card${topClass}">
        <div class="host-lb-left">
          <span class="host-lb-rank-badge">${i + 1}</span>
          <span class="host-lb-initials">${r.initials || getInitials(r.name)}</span>
          <span class="host-lb-player-name">${escapeHtml(r.name)}</span>
        </div>
        <span class="host-lb-player-score">${r.score} pts</span>
      </div>
    `;
  }).join('');
}

// ---------------------------------------------------------------------------
// COUNTDOWN TIMER
// ---------------------------------------------------------------------------
function startCountdown(endsAt) {
  stopCountdown();
  const timerBig = document.getElementById('host-timer-big');

  const tick = () => {
    const remaining = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
    timerBig.textContent = remaining;

    if (remaining <= 3 && remaining > 0) {
      timerBig.classList.add('urgent');
      soundUrgentTick();
    } else {
      timerBig.classList.remove('urgent');
      if (remaining > 0) soundTick();
    }
  };

  tick();
  countdownTimer = setInterval(tick, 250);
}

function stopCountdown() {
  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = null;
  const timerBig = document.getElementById('host-timer-big');
  if (timerBig) timerBig.classList.remove('urgent');
}

// ---------------------------------------------------------------------------
// KEYBOARD SHORTCUTS
// ---------------------------------------------------------------------------
window.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  if (e.code === 'Space') {
    e.preventDefault();
    const primaryBtn = document.querySelector('#host-controls-deck .btn-primary') || document.querySelector('#host-controls-deck #host-skip-btn');
    if (primaryBtn) primaryBtn.click();
  } else if (e.key === 'l' || e.key === 'L') {
    socket.emit('host:return-lobby');
  } else if (e.key === 'f' || e.key === 'F') {
    fsBtn.click();
  } else if (e.key === 'm' || e.key === 'M') {
    audioBtn.click();
  }
});

socket.emit('host:get-state');
