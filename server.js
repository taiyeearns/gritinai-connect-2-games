const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/host', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'host.html'));
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---------------------------------------------------------------------------
// GAME 1: Nature Guess (14 Curated Rounds)
// Mix of Nigerian natural wonders and iconic global landmarks
// ---------------------------------------------------------------------------
const GAME1_ROUNDS = [
  {
    type: 'image',
    label: 'Which natural landmark is shown in this picture?',
    subtitle: 'Famous Nigerian monolith with a natural human face contour',
    options: ['Zuma Rock, Niger State', 'Olumo Rock, Ogun State', 'Aso Rock, Abuja', 'Riyom Rock, Plateau State'],
    correct: 0,
    timer: 12,
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    label: 'Which world-famous canyon is this?',
    subtitle: 'Immense gorge carved over millions of years by the Colorado River',
    options: ['Bryce Canyon, USA', 'Grand Canyon, USA', 'Antelope Canyon, USA', 'Fish River Canyon, Namibia'],
    correct: 1,
    timer: 10,
    image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    label: 'Identify this spectacular waterfall cascade',
    subtitle: 'Seven-tiered forest waterfall discovered in 1140 AD',
    options: ['Agbokim Waterfalls, Cross River', 'Gurara Falls, Niger State', 'Erin Ijesha Waterfalls, Osun State', 'Farin Ruwa Falls, Nasarawa'],
    correct: 2,
    timer: 12,
    image: 'https://images.unsplash.com/photo-1546587348-d12660c30c50?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    label: 'What is the name of this iconic African mountain?',
    subtitle: 'The highest single free-standing mountain in the world',
    options: ['Mount Kenya, Kenya', 'Mount Kilimanjaro, Tanzania', 'Atlas Mountains, Morocco', 'Rwenzori Mountains, Uganda'],
    correct: 1,
    timer: 10,
    image: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    label: 'Which famous highland plateau resort is this?',
    subtitle: 'Renowned highland plateau with rolling clouds and cable car views',
    options: ['Mambilla Plateau, Taraba State', 'Obudu Mountain Resort, Cross River State', 'Jos Plateau, Plateau State', 'Idanre Hills, Ondo State'],
    correct: 1,
    timer: 12,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    label: 'Identify this legendary African waterfall',
    subtitle: 'Locally known as Mosi-oa-Tunya ("The Smoke That Thunders")',
    options: ['Niagara Falls, Canada/USA', 'Iguazu Falls, Argentina/Brazil', 'Victoria Falls, Zambia/Zimbabwe', 'Angel Falls, Venezuela'],
    correct: 2,
    timer: 10,
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    label: 'Which famous national park and spring is this?',
    subtitle: 'Home to the warm Wikki Spring and rich savanna wildlife',
    options: ['Yankari National Park, Bauchi State', 'Kainji Lake National Park, Niger', 'Cross River National Park', 'Okomu National Park, Edo State'],
    correct: 0,
    timer: 12,
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    label: 'What natural light phenomenon is captured here?',
    subtitle: 'Atmospheric light dance caused by solar particles colliding with Earth magnetic field',
    options: ['Aurora Australis, Antarctica', 'Aurora Borealis, Iceland', 'Bioluminescent Bay, Puerto Rico', 'Midnight Sun, Norway'],
    correct: 1,
    timer: 10,
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    label: 'Identify this unique dual-spring geological wonder',
    subtitle: 'Geological phenomenon where warm and cold springs flow side by side',
    options: ['Wikki Warm Spring, Bauchi', 'Ikogosi Warm Springs, Ekiti State', 'Awhum Waterfall & Cave, Enugu', 'Maiyaki Falls, Niger State'],
    correct: 1,
    timer: 12,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    label: 'Which world-famous coral reef system is this?',
    subtitle: 'The world largest living coral reef structure with over 2,900 individual reefs',
    options: ['Palawan Coral Reef, Philippines', 'Red Sea Coral Reef, Egypt', 'Great Barrier Reef, Australia', 'Belize Barrier Reef, Belize'],
    correct: 2,
    timer: 10,
    image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    label: 'Which ancient historic highland fortress is this?',
    subtitle: 'Ancient highland fortress reached via 682 stone steps',
    options: ['Idanre Hills, Ondo State', 'Doma Hills, Nasarawa', 'Koma Hills, Adamawa', 'Shere Hills, Plateau State'],
    correct: 0,
    timer: 12,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    label: 'Identify this extreme geological landscape',
    subtitle: 'One of the hottest, lowest, and most geologically active places on Earth',
    options: ['Death Valley, USA', 'Danakil Depression, Ethiopia', 'Salar de Uyuni, Bolivia', 'Atacama Desert, Chile'],
    correct: 1,
    timer: 10,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    label: 'Which multi-stream waterfall cascade is this?',
    subtitle: 'Surrounded by lush tropical rainforest, renowned for its seven spectacular streams',
    options: ['Erin Ijesha Falls, Osun', 'Agbokim Waterfalls, Cross River State', 'Gurara Waterfalls, Niger State', 'Kwa Falls, Cross River State'],
    correct: 1,
    timer: 12,
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image',
    label: 'Identify these towering karst sandstone pillars',
    subtitle: 'Towering pillars that inspired the floating Hallelujah Mountains in Avatar',
    options: ['Huangshan Mountains, China', 'Guilin Karst Hills, China', 'Zhangjiajie National Forest Park, China', 'Halong Bay, Vietnam'],
    correct: 2,
    timer: 10,
    image: 'https://images.unsplash.com/photo-1513415277900-a62401e19be4?w=800&auto=format&fit=crop&q=80'
  }
];

// ---------------------------------------------------------------------------
// GAME 2: Tech & AI Quiz (15 Questions)
// Fast-paced trivia on AI, Machine Learning, Transformers, and African Tech
// ---------------------------------------------------------------------------
const GAME2_ROUNDS = [
  {
    type: 'quiz',
    label: 'What does the "GPT" in ChatGPT stand for?',
    subtitle: 'The foundational architectural paradigm behind modern AI',
    options: ['General Pre-trained Tensor', 'Generative Pre-trained Transformer', 'Global Predictive Translation', 'Graph Processed Transformer'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'In 2017, Google researchers published which landmark paper introducing Attention & Transformers?',
    subtitle: 'The seminal paper that revolutionized all of generative AI',
    options: ['Deep Residual Learning', 'Attention Is All You Need', 'Mastering the Game of Go', 'Transformers in Vision'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Who is widely celebrated as the father of modern computing and artificial intelligence testing?',
    subtitle: 'He devised the famous imitation game benchmark in 1950',
    options: ['John von Neumann', 'Alan Turing', 'Claude Shannon', 'Ada Lovelace'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What term describes an LLM generating plausible-sounding facts that are completely untrue?',
    subtitle: 'One of the major frontiers in AI safety and alignment',
    options: ['Overfitting', 'Hallucination', 'Drifting', 'Quantization Error'],
    correct: 1,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'Which company developed AlphaFold, solving the 50-year-old protein folding grand challenge in biology?',
    subtitle: 'A historic breakthrough in computational structural biology',
    options: ['OpenAI', 'Google DeepMind', 'Meta AI (FAIR)', 'Anthropic'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What technique uses human feedback to align large language model outputs with human intent?',
    subtitle: 'Key milestone responsible for ChatGPT\'s conversational breakthrough',
    options: ['RLHF (Reinforcement Learning from Human Feedback)', 'GAN (Generative Adversarial Network)', 'CNN (Convolutional Neural Network)', 'SVM (Support Vector Machine)'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which African city is hosting GritinAI Connect 2.0 today?',
    subtitle: 'Historic city known for the ancient Kingdom of Benin and bronze castings',
    options: ['Lagos', 'Abuja', 'Benin City', 'Port Harcourt'],
    correct: 2,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'What is the primary function of an activation function (like ReLU) in a neural network?',
    subtitle: 'Without it, a deep neural network is just a linear regression model',
    options: ['To speed up GPU memory transfers', 'To introduce non-linearity into the model', 'To compress text tokens', 'To encrypt model weights'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which company developed the open-source LLaMA foundation models?',
    subtitle: 'The model family powering a massive open-source AI wave',
    options: ['Microsoft', 'Meta', 'Mistral', 'Amazon AWS'],
    correct: 1,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'What does "RAG" stand for in modern AI application architectures?',
    subtitle: 'Empowering LLMs with real-time enterprise and external data search',
    options: ['Retrieval-Augmented Generation', 'Recursive Auto-associative Graph', 'Relational Algorithm Generator', 'Rapid Adaptive Gradient'],
    correct: 0,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Ada Lovelace is recognized in computer science history for what historic achievement?',
    subtitle: 'Her notes on Charles Babbage\'s Analytical Engine in 1843',
    options: ['Inventing the silicon transistor', 'Writing the first machine algorithm / computer program', 'Designing the ENIAC computer', 'Creating the first neural network'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What does "Weights and Biases" represent inside a neural network?',
    subtitle: 'The adjustable parameters learned during model training',
    options: ['The file size of the model', 'The learned numerical parameters of neural connections', 'The hardware energy consumption', 'The validation error metrics'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'Which hardware component is primarily responsible for the rapid acceleration of modern deep learning?',
    subtitle: 'Parallel processing silicon originally built for 3D graphics',
    options: ['CPU (Central Processing Unit)', 'GPU (Graphics Processing Unit)', 'HDD (Hard Disk Drive)', 'RAM (Random Access Memory)'],
    correct: 1,
    timer: 10
  },
  {
    type: 'quiz',
    label: 'What is the token limit of a language model usually called in AI terminology?',
    subtitle: 'Determines how much previous chat or document history the model can see at once',
    options: ['Batch Size', 'Context Window', 'Latent Dimension', 'Embedding Horizon'],
    correct: 1,
    timer: 12
  },
  {
    type: 'quiz',
    label: 'What is the core mission of GritinAI?',
    subtitle: 'Building empowering tech communities, AI literacy, and real-world intelligence in Africa',
    options: ['Building crypto mining hardware', 'Democratizing AI education, innovation & developer talent in Africa', 'Selling cloud servers', 'Manufacturing smartphones'],
    correct: 1,
    timer: 10
  }
];

// ---------------------------------------------------------------------------
// GAME 3: AI or Human? (14 Mixed Media Rounds)
// Players vote: [🤖 AI Generated] or [🎨 Human Made]
// Includes art, code, poetry, and philosophy with explanations!
// ---------------------------------------------------------------------------
const GAME3_ROUNDS = [
  {
    mediaType: 'text',
    category: 'Poetry',
    prompt: 'Was this stanza written by a human poet or generated by an AI?',
    snippet: '"The autumn leaves are whispers in the chill,\nOld shadows stretching past the silent mill.\nA breath of smoke upon the violet air,\nAnd winter knocking before we are aware."',
    isAi: true,
    options: ['AI Generated', 'Human Made'],
    correct: 0,
    explanation: 'Generated by Claude 3.5 Sonnet in 1.2 seconds when prompted for classic autumnal melancholic rhyme.',
    timer: 14
  },
  {
    mediaType: 'text',
    category: 'Philosophy Quote',
    prompt: 'Who wrote this thought on human cognition and machines?',
    snippet: '"A computer would deserve to be called intelligent if it could deceive a human into believing that it was human."',
    isAi: false,
    options: ['AI Generated', 'Human Made'],
    correct: 1,
    explanation: 'Written by Alan Turing in his famous 1950 paper "Computing Machinery and Intelligence".',
    timer: 14
  },
  {
    mediaType: 'code',
    category: 'Code Snippet',
    prompt: 'Is this legendary algorithm written by a human developer or created by AI?',
    snippet: 'float Q_rsqrt(float number) {\n  long i;\n  float x2, y;\n  const float threehalfs = 1.5F;\n  x2 = number * 0.5F;\n  y  = number;\n  i  = * ( long * ) &y;\n  i  = 0x5f3759df - ( i >> 1 ); // what the...?\n  y  = * ( float * ) &i;\n  y  = y * ( threehalfs - ( x2 * y * y ) );\n  return y;\n}',
    isAi: false,
    options: ['AI Generated', 'Human Made'],
    correct: 1,
    explanation: 'The famous "Fast Inverse Square Root" from Quake III Arena (1999) by John Carmack and team.',
    timer: 15
  },
  {
    mediaType: 'image',
    category: 'Visual Art',
    prompt: 'Was this artwork painted by a human master or generated by Midjourney?',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    caption: 'Atmospheric oil painting of botanical life and floral balance',
    isAi: false,
    options: ['AI Generated', 'Human Made'],
    correct: 1,
    explanation: 'A classic floral oil painting from the Rijksmuseum heritage collection.',
    timer: 12
  },
  {
    mediaType: 'text',
    category: 'Conference Pitch',
    prompt: 'Is this event opening address human-written or generated by AI?',
    snippet: '"Welcome brilliant minds of Benin City to GritinAI Connect 2.0! Where African ingenuity meets the bleeding edge of artificial intelligence. We are not just participants in the fourth industrial revolution; we are the architects charting the continent\'s destiny."',
    isAi: true,
    options: ['AI Generated', 'Human Made'],
    correct: 0,
    explanation: 'Synthesized by GPT-4 to capture the electric energy of GritinAI Connect 2.0 in Benin City.',
    timer: 14
  },
  {
    mediaType: 'code',
    category: 'Code Snippet',
    prompt: 'Did a human write this Python one-liner or was it synthesized by an AI model?',
    snippet: '# Check if a string is an anagram of another:\nis_anagram = lambda s1, s2: sorted(s1.lower().replace(" ", "")) == sorted(s2.lower().replace(" ", ""))',
    isAi: true,
    options: ['AI Generated', 'Human Made'],
    correct: 0,
    explanation: 'Produced by GitHub Copilot as a zero-shot solution to string comparison.',
    timer: 14
  },
  {
    mediaType: 'text',
    category: 'Literature & Drama',
    prompt: 'Was this line penned by an AI or a classic playwright?',
    snippet: '"All the world\'s a stage, and all the men and women merely players; They have their exits and their entrances, and one man in his time plays many parts."',
    isAi: false,
    options: ['AI Generated', 'Human Made'],
    correct: 1,
    explanation: 'Spoken by Jaques in William Shakespeare\'s play "As You Like It" (circa 1599).',
    timer: 12
  },
  {
    mediaType: 'image',
    category: 'Digital Art',
    prompt: 'Is this cyberpunk render AI generated or human 3D art?',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    caption: 'Detailed iridescent fluids and light swirls',
    isAi: false,
    options: ['AI Generated', 'Human Made'],
    correct: 1,
    explanation: 'Digital 3D fluid render crafted by human 3D artist Milad Fakurian.',
    timer: 12
  },
  {
    mediaType: 'text',
    category: 'Haiku',
    prompt: 'Was this contemplative Haiku created by human or artificial mind?',
    snippet: '"Silicon veins pulse,\nLearning patterns in the dark,\nMorning brings the weights."',
    isAi: true,
    options: ['AI Generated', 'Human Made'],
    correct: 0,
    explanation: 'A prompt generated Haiku about backpropagation composed by Gemini 1.5 Pro.',
    timer: 12
  },
  {
    mediaType: 'text',
    category: 'African Proverb',
    prompt: 'Is this an authentic centuries-old African proverb or made up by an AI?',
    snippet: '"If you want to go fast, go alone. If you want to go far, go together."',
    isAi: false,
    options: ['AI Generated', 'Human Made'],
    correct: 1,
    explanation: 'A traditional African proverb celebrating unity, community, and collaboration.',
    timer: 12
  },
  {
    mediaType: 'code',
    category: 'Code Snippet',
    prompt: 'Was this recursive Fibonacci solution generated by AI or human?',
    snippet: 'def fib(n, memo={}):\n    if n in memo: return memo[n]\n    if n <= 1: return n\n    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)\n    return memo[n]',
    isAi: false,
    options: ['AI Generated', 'Human Made'],
    correct: 1,
    explanation: 'A textbook classic memoized recursion written by human CS instructors worldwide.',
    timer: 14
  },
  {
    mediaType: 'text',
    category: 'Sci-Fi Lore',
    prompt: 'Is this sci-fi universe law human-authored or hallucinated by AI?',
    snippet: '"A robot may not injure a human being or, through inaction, allow a human being to come to harm."',
    isAi: false,
    options: ['AI Generated', 'Human Made'],
    correct: 1,
    explanation: 'The First Law of Robotics, created by sci-fi author Isaac Asimov in 1942.',
    timer: 12
  },
  {
    mediaType: 'text',
    category: 'Marketing Slogan',
    prompt: 'Was this slogan created by a human ad agency or an AI tool?',
    snippet: '"SynapseOS: Think less. Create seamlessly. The neural layer for your daily hustle."',
    isAi: true,
    options: ['AI Generated', 'Human Made'],
    correct: 0,
    explanation: 'Generated by ChatGPT as a hypothetical product branding pitch for Nigerian founders.',
    timer: 12
  },
  {
    mediaType: 'image',
    category: 'Urban Scene',
    prompt: 'Is this night scene real-world street photography or an AI image?',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    caption: 'Neon-lit retro arcade console bathed in synthwave reflections',
    isAi: false,
    options: ['AI Generated', 'Human Made'],
    correct: 1,
    explanation: 'Real-world photographic capture by Carl Raw on an arcade cabinet in London.',
    timer: 12
  }
];

const GAMES_CATALOG = {
  game1: {
    id: 'game1',
    title: 'Nature Guess',
    tagline: 'Fastest finger landscape and landmark recognition',
    icon: '1',
    rounds: GAME1_ROUNDS
  },
  game2: {
    id: 'game2',
    title: 'Tech & AI Quiz',
    tagline: '15 High-stakes AI trivia and machine learning questions',
    icon: '2',
    rounds: GAME2_ROUNDS
  },
  game3: {
    id: 'game3',
    title: 'AI or Human?',
    tagline: 'Can you tell human craft from algorithmic generation?',
    icon: '3',
    rounds: GAME3_ROUNDS
  }
};

const RESULT_REVEAL_MS = 6000;

// ---------------------------------------------------------------------------
// SERVER STATE — Single Source of Truth
// ---------------------------------------------------------------------------
let players = {};           // name -> { joinedAt, avatar, socketId }
let activeGameId = 'game1'; // 'game1' | 'game2' | 'game3'
let session = { phase: 'lobby' };
let scores = {
  game1: {},
  game2: {},
  game3: {}
};
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
  io.emit('players:update', {
    players: playerList(),
    count: playerList().length
  });
}

function getActiveGameRounds() {
  return GAMES_CATALOG[activeGameId].rounds;
}

function leaderboardArray(gameId = activeGameId) {
  const gameScores = scores[gameId] || {};
  return Object.keys(gameScores)
    .map(name => ({
      name,
      initials: getInitials(name),
      score: gameScores[name]
    }))
    .sort((a, b) => b.score - a.score);
}

function publicSessionPayload() {
  const gameMeta = GAMES_CATALOG[activeGameId];
  const allGames = Object.keys(GAMES_CATALOG).map(id => ({
    id,
    title: GAMES_CATALOG[id].title,
    tagline: GAMES_CATALOG[id].tagline,
    icon: GAMES_CATALOG[id].icon,
    roundCount: GAMES_CATALOG[id].rounds.length,
    isActive: id === activeGameId
  }));

  if (session.phase === 'round') {
    const rounds = getActiveGameRounds();
    const round = rounds[session.roundIndex];
    return {
      phase: 'round',
      gameId: activeGameId,
      gameTitle: gameMeta.title,
      gameIcon: gameMeta.icon,
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
  }

  if (session.phase === 'roundResult') {
    const rounds = getActiveGameRounds();
    const round = rounds[session.roundIndex];
    return {
      phase: 'roundResult',
      gameId: activeGameId,
      gameTitle: gameMeta.title,
      roundIndex: session.roundIndex,
      totalRounds: rounds.length,
      correctIndex: round.correct,
      correctAnswerText: round.options[round.correct],
      explanation: round.explanation || null,
      resultUntil: session.resultUntil,
      isFinal: session.isFinal,
      leaderboard: leaderboardArray(activeGameId)
    };
  }

  if (session.phase === 'gameEnded') {
    return {
      phase: 'gameEnded',
      gameId: activeGameId,
      gameTitle: gameMeta.title,
      leaderboard: leaderboardArray(activeGameId)
    };
  }

  return {
    phase: 'lobby',
    activeGameId,
    activeGameTitle: gameMeta.title,
    games: allGames
  };
}

function broadcastSession() {
  io.emit('session:update', publicSessionPayload());
}

function startRound(idx) {
  const rounds = getActiveGameRounds();
  if (idx >= rounds.length) {
    session = { phase: 'gameEnded', gameId: activeGameId };
    broadcastSession();
    return;
  }

  const round = rounds[idx];
  currentAnswers = {};
  const durationMs = (round.timer || 12) * 1000;

  session = {
    phase: 'round',
    gameId: activeGameId,
    roundIndex: idx,
    roundStartedAt: Date.now(),
    roundEndsAt: Date.now() + durationMs
  };

  broadcastSession();
  io.emit('answered:count', 0);

  if (roundTimeoutHandle) clearTimeout(roundTimeoutHandle);
  roundTimeoutHandle = setTimeout(() => finalizeRound(idx), durationMs);
}

function finalizeRound(idx) {
  const rounds = getActiveGameRounds();
  const round = rounds[idx];
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

  // Award points based on arrival order (fastest = 100, reduces by 1 per subsequent correct answer down to 0)
  // Accommodates up to 100 players on leaderboard (Rank 1 = 100 pts, Rank 2 = 99 pts ... Rank 100 = 1 pt)
  const roundPointsMap = {};
  correctEntries.forEach((entry, rankIdx) => {
    const points = Math.max(100 - rankIdx, 0);
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
      correctAnswerText: round.options[round.correct]
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
    roundIndex: idx,
    resultUntil: Date.now() + RESULT_REVEAL_MS,
    isFinal,
    nextRoundIndex: isFinal ? null : idx + 1
  };
  broadcastSession();

  roundTimeoutHandle = setTimeout(() => {
    if (session.isFinal) {
      session = { phase: 'gameEnded', gameId: activeGameId };
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
    socket.emit('players:update', { players: playerList(), count: playerList().length });
    socket.emit('session:update', publicSessionPayload());
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

    io.emit('answered:count', Object.keys(currentAnswers).length);
  });

  // Host Controls
  socket.on('host:select-game', (gameId) => {
    if (GAMES_CATALOG[gameId] && session.phase === 'lobby') {
      activeGameId = gameId;
      broadcastSession();
    }
  });

  socket.on('host:start-game', (gameId) => {
    if (gameId && GAMES_CATALOG[gameId]) {
      activeGameId = gameId;
    }
    if (session.phase !== 'lobby' && session.phase !== 'gameEnded') return;
    // Reset scores for this game so each game is independent and fresh
    scores[activeGameId] = {};
    startRound(0);
  });

  socket.on('host:return-lobby', () => {
    if (roundTimeoutHandle) {
      clearTimeout(roundTimeoutHandle);
      roundTimeoutHandle = null;
    }
    session = { phase: 'lobby' };
    currentAnswers = {};
    broadcastSession();
  });

  socket.on('host:skip-round', () => {
    if (session.phase !== 'round') return;
    if (roundTimeoutHandle) {
      clearTimeout(roundTimeoutHandle);
      roundTimeoutHandle = null;
    }
    finalizeRound(session.roundIndex);
  });

  socket.on('host:reset-scores', () => {
    scores[activeGameId] = {};
    broadcastSession();
  });

  socket.on('host:get-state', () => {
    socket.emit('players:update', { players: playerList(), count: playerList().length });
    socket.emit('session:update', publicSessionPayload());
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
  console.log(`Player Arena:     http://localhost:${PORT}`);
  console.log(`Host Broadcaster: http://localhost:${PORT}/host.html`);
  console.log('----------------------------------------------------');
});
