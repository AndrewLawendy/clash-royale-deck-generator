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
