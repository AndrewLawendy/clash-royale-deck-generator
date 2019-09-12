import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { togglePopup, selectCard } from '../actions/actions';
import CardInfo from './CardInfo';
import elixirPng from '../assets/elixir.png';

const mapDispatchToProps = (dispatch) => ({
  openInfo: (card, component) => {
    dispatch(selectCard(card));
    dispatch(togglePopup(true, component));
  },
});

function Card(props) {
  const { card = {}, openInfo } = props;

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
    <li>
      <button type="button" onClick={() => openInfo(card, <CardInfo card={card} />)}>
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
      </button>
    </li>
  );
}


Card.propTypes = {
  card: PropTypes.oneOfType([PropTypes.object]).isRequired,
  openInfo: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Card);
