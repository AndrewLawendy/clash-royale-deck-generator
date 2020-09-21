import Cards from '../api-locals/cards.json';

export const getCards = () => Cards.items;

export const getCard = (id) => Cards.items.find(
  (card) => card.id === Number(id),
);

export const getRandomCards = () => {
  const shuffled = [...Cards.items];

  shuffled.forEach((_item, idx) => {
    const j = Math.floor(Math.random() * shuffled.length);
    [shuffled[idx], shuffled[j]] = [shuffled[j], shuffled[idx]];
  });

  return shuffled.slice(0, 8);
};

export const classList = (...classes) => classes
  .filter((item) => !!item)
  .join(' ');


export const sumByProp = (arr, prop) => arr.reduce((acc, curr) => {
  if (!acc[curr[prop]]) acc[curr[prop]] = 0;
  acc[curr[prop]] += 1;
  return acc;
}, {});


export const groupByProp = (arr, prop) => arr.reduce((acc, curr) => {
  if (!acc[curr[prop]]) acc[curr[prop]] = [];
  acc[curr.rarity].push(curr);
  return acc;
}, {});
