/* eslint-env browser */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomDeck from './CustomDeck';

import { passCards, togglePopup } from '../actions/actions';

const mapStateToProps = (state) => {
  const { filteredDeck } = state.filteredReducer;
  return { filteredDeck };
};

const mapDispatchToProps = (dispatch) => ({
  gen: (cards) => {
    dispatch(passCards(cards));
  },
  openPopup: (component) => {
    dispatch(togglePopup(true, component));
  },
});

function DeckBtnCtrls(props) {
  const { openPopup, filteredDeck } = props;

  const generateRandomDeck = () => {
    document.getElementById('gen-deck').play();
    const { gen } = props;
    fetch('http://www.clashapi.xyz/api/random-deck')
      .then((res) => res.json())
      .then((res) => {
        gen(res);
      });
  };

  const genShareableLink = () => {
    document.getElementById('copy-success').play();
    document.getElementById('shareable-link').select();
    document.execCommand('copy');
  };

  /* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

  return (
    <div id="deck-btns-ctrl">
      <button
        type="button"
        className="btn btn-red"
        disabled={!filteredDeck.length}
        onClick={filteredDeck.length ? genShareableLink : () => { }}
      >
                Copy Shareable Link
      </button>
      <button
        type="button"
        id="custom-builder"
        className="btn btn-green"
        onClick={() => openPopup(<CustomDeck />)}
      >
                Build Custom Deck
      </button>
      <button
        type="button"
        onClick={generateRandomDeck}
        id="generate-random"
        className="btn btn-yellow"
      >
                Generate
      </button>
    </div>
  );
}

DeckBtnCtrls.propTypes = {
  filteredDeck: PropTypes.arrayOf(PropTypes.object).isRequired,
  gen: PropTypes.func.isRequired,
  openPopup: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckBtnCtrls);
