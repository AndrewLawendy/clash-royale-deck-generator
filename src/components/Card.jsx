import React from 'react';
import PropTypes from 'prop-types';
import elixirPng from '../assets/elixir.png';


function Card(props) {
  const { card } = props;

  const checkLevel = (rarity) => {
    switch (rarity) {
      case 'Common':
        return 1;
      case 'Rare':
        return 3;
      case 'Epic':
        return 6;
      default:
        return 9;
    }
  };

  return (
    <span>
      <img
        className="card-img"
        src={`http://www.clashapi.xyz/images/cards/${card.idName}.png`}
        alt={card.name}
      />
      <span className="card-elixir-cost">
        <img src={elixirPng} alt="Elixir" />
        <span>{card.elixirCost}</span>
      </span>
      <span className="card-lvl text-center text-border">
        {`Level ${checkLevel(card.rarity)}`}
      </span>
    </span>
  );
}


Card.propTypes = {
  card: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Card;
