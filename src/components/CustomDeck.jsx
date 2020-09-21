/* eslint-env browser */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  passCards, passTempCards, passAllCards, togglePopup,
} from '../actions/actions';
import { getCards, classList, groupByProp } from '../helpers/helpers';

import Card from './Card';
import Tabs from './Tabs';

const mapStateToProps = (state) => {
  const { allCards, tempCards } = state.filteredReducer;
  return { allCards, tempCards };
};

const mapDispatchToProps = (dispatch) => ({
  getAll: (cards) => {
    dispatch(passAllCards(cards));
  },
  passTemp: (cards) => {
    dispatch(passTempCards(cards));
  },
  submit: (cards, popup) => {
    if (popup) dispatch(togglePopup(false));
    dispatch(passCards(cards));
  },
});

class CustomDeck extends Component {
  constructor(props) {
    super(props);
    this.toggleAddCard = this.toggleAddCard.bind(this);
  }

  componentDidMount() {
    const { allCards, getAll, passTemp } = this.props;
    document.getElementById('bg-loop').pause();
    document.getElementById('deck-popup').play();
    passTemp([]);
    if (!allCards.length) {
      const cards = getCards();
      const groupByRarity = groupByProp(cards, 'rarity');
      getAll(groupByRarity);
    }
  }

  componentWillUnmount() {
    const deckPopup = document.getElementById('deck-popup');
    document.getElementById('bg-loop').play();
    deckPopup.pause();
    deckPopup.currentTime = 0;
  }

  toggleAddCard(card) {
    const { tempCards, passTemp } = this.props;
    const includes = tempCards.includes(card);
    if (tempCards.length < 8 && !includes) { // Add
      document.getElementById('card-select').play();
      passTemp(tempCards.concat(card));
    } else if (includes) { // Remove
      document.getElementById('card-select').play();
      const index = tempCards.indexOf(card);
      passTemp(tempCards.slice(0, index).concat(tempCards.slice(index + 1)));
    }
  }

  render() {
    const {
      allCards,
      tempCards, submit, passTemp,
    } = this.props;
    return (
    /* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

      <div id="custom-deck-container">
        <h2>Build your own custom deck</h2>
        {tempCards.length ? (
          <p>
            {`You chose ${tempCards.length} card(s): `}
            {tempCards.map((card, index) => <span key={card.id}>{`${index ? ',' : ''} ${card.name}/${card.elixirCost}(${card.rarity})`}</span>)}
          </p>
        ) : <p>Click on the cards to build your deck!</p>}
        <Tabs tabs={['Common', 'Rare', 'Epi', 'Legendary']}>
          {Object.keys(allCards).map((rarity) => (
            <ul className="cards-container" key={rarity}>
              {allCards[rarity].map((card) => (
                <li
                  className={classList(
                    'btn-pointer',
                    tempCards.includes(card) && 'chosen',
                    tempCards.length === 8 && !tempCards.includes(card) && 'not-allowed',
                  )}
                  key={card._id}
                  onClick={() => this.toggleAddCard(card)}
                  title={tempCards.includes(card) ? 'Click to remove from the list!' : 'Click to choose!'}
                  role="presentation"
                >
                  <Card card={card} />
                </li>
              ))}
            </ul>
          ))}
        </Tabs>
        <div id="custom-deck-ctrl">
          <button type="button" className="btn btn-red" disabled={!tempCards.length} onClick={() => (tempCards.length ? passTemp([]) : '')}>Reset</button>
          <button type="button" className="btn btn-green" disabled={tempCards.length < 8} onClick={() => (tempCards.length === 8 ? submit(tempCards, true) : '')}>Submit</button>
        </div>
      </div>
    );
  }
}

CustomDeck.propTypes = {
  allCards: PropTypes.oneOfType([PropTypes.object]).isRequired,
  tempCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAll: PropTypes.func.isRequired,
  passTemp: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomDeck);
