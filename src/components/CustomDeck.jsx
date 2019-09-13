/* eslint-env browser */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { passAllCards } from '../actions/actions';

import Card from './Card';
import Tabs from './Tabs';

const mapStateToProps = (state) => {
  const { allCards } = state.filteredReducer;
  return { allCards };
};

const mapDispatchToProps = (dispatch) => ({
  getAll: (cards) => {
    dispatch(passAllCards(cards));
  },
});

class CustomDeck extends Component {
  componentDidMount() {
    const { allCards, getAll } = this.props;
    if (!allCards.length) {
      fetch('http://www.clashapi.xyz/api/cards')
        .then((res) => res.json())
        .then((res) => getAll(res));
    }
  }

  render() {
    const { allCards } = this.props;
    const cardsByRarity = allCards.reduce((acc, curr) => {
      if (!acc[curr.rarity]) acc[curr.rarity] = [];
      acc[curr.rarity].push(curr);
      return acc;
    }, {});
    return (
    /* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

      <div id="custom-deck-container">
        <h2>Build your own custom deck</h2>
        <Tabs tabs={Object.keys(cardsByRarity)}>
          {Object.keys(cardsByRarity).map((rarity) => (
            <ul className="cards-container" key={rarity}>
              {cardsByRarity[rarity].map((card) => (
                <li className="btn-pointer" key={card._id} role="presentation">
                  <Card card={card} />
                </li>
              ))}
            </ul>
          ))}
        </Tabs>
      </div>
    );
  }
}

CustomDeck.propTypes = {
  allCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAll: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomDeck);
