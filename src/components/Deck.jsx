/* eslint-env browser */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { genRandom } from '../actions/actions';

const mapStateToProps = (state) => {
  const { randomDeck } = state.randomReducer;
  return { randomDeck };
};

const mapDispatchToProps = (dispatch) => ({
  gen: (random) => {
    dispatch(genRandom(random));
  },
});

function Deck(props) {
  const { randomDeck, gen } = props;
  function generateRandomDeck() {
    fetch('http://www.clashapi.xyz/api/random-deck')
      .then((res) => res.json())
      .then((res) => {
        gen(res);
      });
  }
  /* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

  return (
    <div>
      <ul>
        {randomDeck.map((card) => (
          <li
            key={card._id}
          >
            {card.idName}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={generateRandomDeck}
      >
                Generate
      </button>
    </div>
  );
}

Deck.propTypes = {
  randomDeck: PropTypes.shape([]).isRequired,
  gen: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
