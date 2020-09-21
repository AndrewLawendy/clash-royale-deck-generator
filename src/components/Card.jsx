import React from 'react';
import PropTypes from 'prop-types';
import elixirPng from '../assets/elixir.png';


function Card(props) {
  const { card } = props;

  return (
    <span>
      <img
        className="card-img"
        src={card.iconUrls.medium}
        alt={card.name}
      />
      <span className="card-elixir-cost">
        <img src={elixirPng} alt="Elixir" />
        <span>{card.elixirCost}</span>
      </span>
      <span className="card-lvl text-center text-border">
        {`Level ${card.maxLevel}`}
      </span>
    </span>
  );
}


Card.propTypes = {
  card: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Card;
