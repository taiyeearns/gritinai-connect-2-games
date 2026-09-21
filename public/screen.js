const socket = io({
  transports: ['websocket', 'polling']
});

// ---------------------------------------------------------------------------
// PROCEDURAL AUDIO ENGINE FOR BROADCASTER
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

function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.12) {
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
  playTone(800, 'sine', 0.04, 0.04);
}

function soundUrgentTick() {
  playTone(1200, 'triangle', 0.08, 0.08);
}

function soundFanfare() {
  if (!audioEnabled) return;
  try {
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((f, i) => setTimeout(() => playTone(f, 'triangle', 0.3, 0.15), i * 90));
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
// BROADCASTER STATE
// ---------------------------------------------------------------------------
let totalPlayerCount = 0;
let currentPayload = null;
let countdownTimer = null;

// Fullscreen
const fsBtn = document.getElementById('host-fullscreen-btn');
if (fsBtn) {
  fsBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      fsBtn.textContent = 'Exit Fullscreen';
    } else {
      document.exitFullscreen().catch(() => {});
      fsBtn.textContent = 'Fullscreen';
    }
  });
}

// Audio toggle
const audioBtn = document.getElementById('host-audio-toggle');

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
  });
}

socket.on('audio:state', (enabled) => {
  updateAudioBtnUI(enabled);
});

// Sidebar Tabs: Leaderboard vs Roster
const tabLb = document.getElementById('tab-show-lb');
const tabRoster = document.getElementById('tab-show-roster');
const listLb = document.getElementById('host-lb-list');
const listRoster = document.getElementById('host-roster-list');

if (tabLb && tabRoster && listLb && listRoster) {
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
}

// ---------------------------------------------------------------------------
// PLAYERS UPDATE
// ---------------------------------------------------------------------------
socket.on('players:update', ({ players, count }) => {
  totalPlayerCount = count;
  const pCountEl = document.getElementById('host-players-count');
  const rCountEl = document.getElementById('host-roster-count');
  if (pCountEl) pCountEl.textContent = count;
  if (rCountEl) rCountEl.textContent = count;

  if (listRoster) {
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
  if (typeof payload.audioEnabled === 'boolean') {
    updateAudioBtnUI(payload.audioEnabled);
  }

  const stageTag = document.getElementById('host-stage-tag');
  const timerBig = document.getElementById('host-timer-big');
  const stageContent = document.getElementById('host-stage-content');
  const responseMeter = document.getElementById('host-response-meter');
  const pillTitle = document.getElementById('screen-pill-title');

  stopCountdown();

  if (payload.phase === 'lobby') {
    if (pillTitle) pillTitle.textContent = `${payload.activeGameTitle || 'GritinAI'} (${(payload.activeSetId || 'set1').toUpperCase()})`;
    if (stageTag) stageTag.textContent = 'LOBBY ARENA';
    if (timerBig) timerBig.classList.add('hidden');
    if (responseMeter) responseMeter.classList.add('hidden');

    const formattedSet = (payload.activeSetId || 'set1').replace('set', 'Set ');

    if (stageContent) {
      stageContent.innerHTML = `
        <div style="text-align: center; padding: 32px 0;">
          <h1 class="host-question-display">Ready for ${escapeHtml(payload.activeGameTitle)}</h1>
          <p class="host-question-sub">Selected: <strong>${formattedSet}</strong> &bull; The host will launch the round momentarily.</p>
          <div style="display: flex; justify-content: center; gap: 16px; margin-top: 28px;">
            <div style="background: rgba(255,255,255,0.06); padding: 20px 36px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.1);">
              <div style="font-size: 38px; font-weight: 800; color: var(--blue); font-family: 'Space Grotesk', sans-serif;">${totalPlayerCount}</div>
              <div style="font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 4px; letter-spacing: 0.05em; font-weight: 600;">PLAYERS READY</div>
            </div>
          </div>
        </div>
      `;
    }
    return;
  }

  if (payload.phase === 'round') {
    const formattedSet = (payload.setId || 'set1').replace('set', 'Set ');
    if (pillTitle) pillTitle.textContent = `${payload.gameTitle} : ${formattedSet}`;
    if (stageTag) stageTag.textContent = `${payload.gameTitle.toUpperCase()} : ROUND ${payload.roundIndex + 1} OF ${payload.totalRounds}`;
    if (timerBig) timerBig.classList.remove('hidden');
    if (responseMeter) responseMeter.classList.remove('hidden');

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

    if (stageContent) {
      stageContent.innerHTML = `
        <div class="host-question-display">${escapeHtml(payload.label)}</div>
        ${payload.subtitle ? `<div class="host-question-sub">${escapeHtml(payload.subtitle)}</div>` : ''}
        ${mediaHtml}
      `;
    }

    startCountdown(payload.roundEndsAt);
    return;
  }

  if (payload.phase === 'startingCountdown') {
    if (pillTitle) pillTitle.textContent = `${payload.gameTitle || 'GritinAI Arena'} (${(payload.setId || 'set1').toUpperCase()})`;
    if (stageTag) stageTag.textContent = 'GAME COMMENCING';
    if (timerBig) timerBig.classList.add('hidden');
    if (responseMeter) responseMeter.classList.add('hidden');

    // Pre-cache first round image during the 3.5-second countdown
    if (payload.firstRoundImage) {
      const preloadImg = new Image();
      preloadImg.src = payload.firstRoundImage;
    }

    if (stageContent) {
      stageContent.innerHTML = `
        <div class="starting-countdown-box">
          <span class="starting-countdown-badge">GAME STARTING IN</span>
          <div class="starting-countdown-number" id="screen-start-countdown-num">3</div>
          <div class="starting-countdown-game">${escapeHtml(payload.gameTitle)} &bull; ${(payload.setId || 'set1').toUpperCase()}</div>
        </div>
      `;
    }

    const numEl = document.getElementById('screen-start-countdown-num');
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
    countdownTimer = setInterval(tickStart, 300);
    return;
  }

  if (payload.phase === 'roundResult') {
    if (stageTag) stageTag.textContent = `${payload.gameTitle.toUpperCase()} : ROUND ${payload.roundIndex + 1} REVEAL`;
    if (timerBig) timerBig.classList.remove('hidden');
    if (responseMeter) responseMeter.classList.add('hidden');

    // Pre-cache upcoming round image during the 6-second reveal break
    if (payload.nextRoundImage) {
      const preloadNext = new Image();
      preloadNext.src = payload.nextRoundImage;
    }

    renderHostLeaderboard(payload.leaderboard);

    if (stageContent) {
      stageContent.innerHTML = `
        <div style="padding: 12px 0;">
          <div style="font-size: 13px; font-weight: 800; color: var(--emerald); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">Correct Answer</div>
          <div class="host-question-display" style="color: var(--emerald); margin-bottom: 14px;">
            ✓ ${escapeHtml(payload.correctAnswerText)}
          </div>
          ${payload.explanation ? `
            <div class="insight-box" style="background: rgba(255,255,255,0.06); border-left-color: var(--emerald); color: #FFFFFF; font-size: 16px; padding: 18px 22px; margin-bottom: 14px;">
              <div class="insight-label" style="color: var(--emerald);">Context &amp; Insight</div>
              ${escapeHtml(payload.explanation)}
            </div>
          ` : ''}
          ${!payload.isFinal ? `
            <div class="next-round-countdown-bar">
              <span>Next Round in</span>
              <span class="countdown-highlight" id="screen-next-round-timer">6s</span>
            </div>
          ` : ''}
        </div>
      `;
    }

    startCountdown(payload.resultUntil);
    return;
  }

  if (payload.phase === 'gameEnded') {
    if (stageTag) stageTag.textContent = `${payload.gameTitle.toUpperCase()} : FINAL RESULTS`;
    if (timerBig) timerBig.classList.add('hidden');
    if (responseMeter) responseMeter.classList.add('hidden');

    soundFanfare();
    renderHostLeaderboard(payload.leaderboard);

    const winner = payload.leaderboard && payload.leaderboard[0];
    if (stageContent) {
      stageContent.innerHTML = `
        <div style="text-align: center; padding: 32px 0;">
          <div style="font-size: 13px; font-weight: 800; color: var(--gold); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">GRAND CHAMPION</div>
          <h1 class="host-question-display" style="color: #FFF;">${winner ? escapeHtml(winner.name) : 'Session Completed'}</h1>
          <p class="host-question-sub" style="font-size: 20px; color: var(--gold); font-weight: 700;">Top Score: ${winner ? winner.score : 0} points</p>
        </div>
      `;
    }
  }
});

// ---------------------------------------------------------------------------
// LEADERBOARD RENDER
// ---------------------------------------------------------------------------
function renderHostLeaderboard(leaderboard) {
  if (!listLb) return;
  const lb = leaderboard || [];
  if (lb.length === 0) {
    listLb.innerHTML = '<div class="empty-state">No scores registered yet</div>';
    return;
  }

  listLb.innerHTML = lb.slice(0, 100).map((r, i) => {
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
  if (!timerBig) return;

  const tick = () => {
    const remaining = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
    timerBig.textContent = remaining;

    const nextRoundTimerEl = document.getElementById('screen-next-round-timer');
    if (nextRoundTimerEl) {
      nextRoundTimerEl.textContent = `${remaining}s`;
    }

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
// KEYBOARD SHORTCUTS FOR BROADCASTER
// ---------------------------------------------------------------------------
window.addEventListener('keydown', (e) => {
  if (e.key === 'f' || e.key === 'F') {
    if (fsBtn) fsBtn.click();
  } else if (e.key === 'm' || e.key === 'M') {
    if (audioBtn) audioBtn.click();
  }
});

socket.on('connect', () => {
  socket.emit('screen:register');
});

socket.emit('screen:register');
