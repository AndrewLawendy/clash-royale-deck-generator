/* eslint-env browser */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  passCards, passTempCards, passAllCards, togglePopup,
} from '../actions/actions';

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
    if (popup)dispatch(togglePopup(false));
    dispatch(passCards(cards));
  },
});

class CustomDeck extends Component {
  constructor(props) {
    super(props);
    this.addToTemp = this.addToTemp.bind(this);
  }

  componentDidMount() {
    const { allCards, getAll, passTemp } = this.props;
    passTemp([]);
    if (!allCards.length) {
      fetch('http://www.clashapi.xyz/api/cards')
        .then((res) => res.json())
        .then((res) => getAll(res));
    }
  }

  addToTemp(card) {
    const { tempCards, passTemp } = this.props;
    if (!tempCards.includes(card) && tempCards.length < 8) passTemp(tempCards.concat(card));
  }

  removeFromTemp(card) {
    const { tempCards, passTemp } = this.props;
    const index = tempCards.indexOf(card);
    passTemp(tempCards.slice(0, index).concat(tempCards.slice(index + 1)));
  }

  render() {
    const {
      allCards, tempCards, submit, passTemp,
    } = this.props;
    const cardsByRarity = allCards.reduce((acc, curr) => {
      if (!acc[curr.rarity]) acc[curr.rarity] = [];
      acc[curr.rarity].push(curr);
      return acc;
    }, {});
    return (
    /* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

      <div id="custom-deck-container">
        <h2>Build your own custom deck</h2>
        {tempCards.length ? (
          <p>
Your choices are
            {tempCards.map((card, index) => <span key={card._id}>{`${index ? ',' : ''} ${card.name}/${card.elixirCost}(${card.rarity})`}</span>)}
          </p>
        ) : <p>Click on the cards to build your deck!</p>}
        <Tabs tabs={Object.keys(cardsByRarity)}>
          {Object.keys(cardsByRarity).map((rarity) => (
            <ul className="cards-container" key={rarity}>
              {cardsByRarity[rarity].map((card) => (
                <li className={`btn-pointer ${tempCards.includes(card) ? 'chosen' : ''}`} key={card._id} onClick={() => (tempCards.includes(card) ? this.removeFromTemp(card) : this.addToTemp(card))} title={tempCards.includes(card) ? 'Click to remove from the list!' : 'Click to choose!'} role="presentation">
                  <Card card={card} />
                </li>
              ))}
            </ul>
          ))}
        </Tabs>
        <button type="button" disabled={!tempCards.length} onClick={() => (tempCards.length ? passTemp([]) : '')}>Reset</button>
        <button type="button" disabled={tempCards.length < 8} onClick={() => (tempCards.length === 8 ? submit(tempCards, true) : '')}>Submit</button>
      </div>
    );
  }
}

CustomDeck.propTypes = {
  allCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  tempCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAll: PropTypes.func.isRequired,
  passTemp: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomDeck);
