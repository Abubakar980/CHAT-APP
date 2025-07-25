// src/utils/emojis.js

export const funEmojis = [
  "👾", "⭐", "🌟", "🎉", "🎊", "🎈", "🎁", "🎂", "🎄", "🎃", "🎗", "🎟", "🎫",
  "🎖", "🏆", "🏅", "🥇", "🥈", "🥉", "⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉",
  "🎱", "🏓", "🏸", "🥅", "🏒", "🏑", "🏏", "⛳", "🏹", "🎣", "🥊", "🥋", "🎽",
  "⛸", "🥌", "🛷", "🎿", "⛷", "🏂", "🏋️", "🤼", "🤸", "🤺", "⛹️", "🤾", "🏌️",
  "🏇", "🧘"
];

export const getRandomEmoji = () => {
  return funEmojis[Math.floor(Math.random() * funEmojis.length)];
};
