const game1Sets = require('./game1');
const game2Sets = require('./game2');
const game3Sets = require('./game3');

const GAMES_CATALOG = {
  game1: {
    id: 'game1',
    title: 'Nature Guess',
    tagline: 'Fastest finger landscape and landmark recognition',
    icon: '1',
    sets: game1Sets
  },
  game2: {
    id: 'game2',
    title: 'Tech & AI Quiz',
    tagline: 'High-stakes AI trivia and machine learning questions',
    icon: '2',
    sets: game2Sets
  },
  game3: {
    id: 'game3',
    title: 'AI or Human?',
    tagline: 'Can you tell human craft from algorithmic generation?',
    icon: '3',
    sets: game3Sets
  }
};

module.exports = {
  GAMES_CATALOG
};
