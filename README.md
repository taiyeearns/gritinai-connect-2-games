# GritinAI Connect 2.0 — Live Session Games

## Quickstart
```bash
npm install
npm start
```
- **Player page**: `http://localhost:3000`
- **Host Broadcaster page**: `http://localhost:3000/host.html`

---

## What this is
A production-grade, self-built live interactive games platform for **GritinAI Connect 2.0**, a tech conference in Benin City, Nigeria (~75–250 concurrent players on their own phones, one host running things from a laptop/projector).

Three games, played with independent leaderboards and winners:

1. **🌿 Nature Guess** — Timed photo/name multiple choice with real Nigerian natural wonders (Zuma Rock, Erin Ijesha, Obudu, Yankari, Ikogosi, Idanre Hills, Agbokim) and global icons. Fastest correct answer scores highest (100 down to 10 pts). **Built & live.**
2. **⚡ Tech & AI Quiz** — 15 curated high-stakes trivia questions covering LLMs, Attention/Transformers, Turing, RLHF, AlphaFold, Benin City, and African AI innovation. **Built & live.**
3. **🤖 AI or Human?** — 14 mixed-media rounds across code, visual art, poetry, philosophy, and marketing snippets where players guess whether it was created by AI or a human. Includes post-round context/explanation. **Built & live.**

---

## Key Features Built & Production-Ready

### 1. WhatsApp-Style Tech & AI Doodle Wallpaper
- Custom inline SVG doodle pattern (`/assets/doodle-pattern.svg`) featuring clean line art: AI neural brains, gamepads, laptops, trophies, rockets, code brackets, lightning bolts, and robots.
- Subtle background aesthetic styled strictly within brand tokens.

### 2. Strict 100vh / Zero-Scroll Pre-Join Landing Experience
- Single-viewport screen (`height: 100dvh`, `overflow: hidden`, zero vertical or horizontal scrolling) with live conference badges ("Benin City 2026 · Live Arena"), GritinAI brand lockup, 3-game preview cards, and an instant "Enter the Arena" transition.
- Followed by a quick avatar selector (⚡, 🚀, 🧠, 🔥, 🦁, 🎯) and name entry card.
- Player identity & avatar persist in `localStorage` for instant reconnects.

### 3. Dynamic 3-Game Selection Lobby
- Visual 3-card corridor showing all 3 games.
- Host selection controls which game is active (`● LIVE ARENA`), with upcoming games locked in view (`UP NEXT`).
- Real-time online attendee counter and player profile preview.

### 4. Fastest-Finger Scoring & Personal Round Feedback
- Order-of-arrival scoring: 1st correct answer gets 100 pts, each subsequent gets 10 less (floor of 10 pts). Wrong/timed-out answer = 0 pts.
- Instant personal feedback card: displays points awarded, exact speed in seconds (`"Answered in 1.4s"`), and rank (`"#1 fastest"`).

### 5. Host Command Center & Projector View (`/host.html`)
- Built for large conference projectors and host laptops:
  - Game tabs (`🌿 Nature Guess`, `⚡ Tech & AI Quiz`, `🤖 AI or Human?`).
  - Huge prompt display, live countdown clock with urgency shake.
  - Live response speedometer progress bar (`XX / YY answered`).
  - Real-time Top 10 Leaderboard with Gold (🥇), Silver (🥈), Bronze (🥉) podium badges.
  - Collapsible player roster list.
  - Procedural sound synthesis (ticks, buzzers, victory fanfares) via Web Audio API.
  - Keyboard shortcuts: `[Space]` Next/Start, `[L]` Lobby, `[F]` Fullscreen, `[M]` Mute.

---

## Brand Kit & Styling
```
Main blue:        #0088FF
Footer dark:      #111110
Main white:       #FFFFFF
Accent grey:      rgba(0,0,0,0.14)
Accent 2:         #F4F4F2
Black text:       #0E0E0C
Text grey:        #737373
Success emerald:  #10B981
Urgent rose:      #EF4444

Main font:   system-ui (UI labels, buttons, tags)
Fancy font:  Cormorant Garamond (headings, host dials, quotes)
Body font:   DM Sans (body copy, options, meta)
Mono font:   SFMono-Regular, Menlo, monospace (code snippets)
```

---

## File Structure
```
server.js                — Node.js + Express + Socket.IO (single source of truth for all 3 games)
public/
  index.html             — Player view (100vh pre-join, avatar picker, 3-game lobby, round stage, result)
  player.js              — Player client logic, sound effects, reconnect handling
  host.html              — Host broadcaster & projector command center
  host.js                — Host client logic, live response gauge, shortcuts
  style.css              — Unified responsive design system & doodle wallpaper
  assets/
    logo-gritin.png      — GritinAI mark
    logo-connect.png     — GritinAI Connect 2.0 lockup
    doodle-pattern.svg   — WhatsApp-style tech & AI vector wallpaper
```

---

## Deployment Recommendation for Event Day
Before the conference, deploy to a cloud platform with WebSocket support (e.g., Render, Railway, Fly.io, or DigitalOcean) so all attendee phones on local 4G/5G/WiFi can connect simultaneously to the public URL or QR code.
