import React from 'react';
import PropTypes from 'prop-types';

function CardInfo(props) {
  const { card } = props;

  return (
    <div id="card-info">
      <h2>Card Info</h2>
      <img
        className="card-img"
        src={card.iconUrls.medium}
        alt={card.name}
      />
      <div className="card-description">
        <h3>Name</h3>
        <p>{card.name}</p>
        <h3>Rarity</h3>
        <p>{card.rarity}</p>
        <h3>Elixir Cost</h3>
        <p>{card.elixirCost}</p>
        <h3>Type</h3>
        <p>{card.type}</p>
        <h3>Description</h3>
        <p>{card.description}</p>
      </div>
    </div>
  );
}

CardInfo.propTypes = {
  card: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CardInfo;
