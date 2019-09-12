import React from 'react';
import PropTypes from 'prop-types';

function CardInfo(props) {
  const { card } = props;

  return (
    <div id="card-info">
      <h2>Card Info</h2>
      <img
        className="card-img"
        src={`http://www.clashapi.xyz/images/cards/${card.idName}.png`}
        alt={card.name}
      />
      <p>{card.name}</p>
    </div>
  );
}

CardInfo.propTypes = {
  card: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CardInfo;
