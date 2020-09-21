import React from 'react';
import PropTypes from 'prop-types';
import BarChart from './BarChart';
import { sumByProp } from '../helpers/helpers';

function DeckStats(props) {
  const { cards } = props;
  const elixirAvg = (cards.reduce((acc, curr) => acc + curr.elixirCost, 0) / 8).toFixed(1);
  const elixirMin = cards.map((card) => card.elixirCost).sort().slice(0, 4).reduce((acc, curr) => acc + curr, 0);
  const rarities = sumByProp(cards, 'rarity');

  return (
    <div id="deck-stats">
      <h2>Deck Stats</h2>
      <h3>Average</h3>
      <BarChart obj={{ '': elixirAvg }} maximum={10} />
      <h3>4-Card Cycle</h3>
      <BarChart obj={{ '': elixirMin }} maximum={40} />
      <h3>Rarities</h3>
      <BarChart obj={rarities} />
    </div>
  );
}

DeckStats.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DeckStats;
