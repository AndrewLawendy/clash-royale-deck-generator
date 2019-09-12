/* eslint-env browser */
import React, { Component } from 'react';
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

class Deck extends Component {
  constructor(props) {
    super(props);
    this.generateRandomDeck = this.generateRandomDeck.bind(this);
    this.followingDeck = this.followingDeck.bind(this);
    this.state = {
      deckRotationX: 0,
      deckRotationY: 0,
    };
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.followingDeck);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.followingDeck);
  }

  followingDeck(e) {
    const rotateY = (e.clientX - (window.innerWidth / 2)) / 160;
    const rotateX = (e.clientY - (window.innerHeight / 2)) / 140;
    this.setState(() => ({
      deckRotationX: rotateX,
      deckRotationY: rotateY,
    }));
  }

  generateRandomDeck() {
    const { gen } = this.props;
    fetch('http://www.clashapi.xyz/api/random-deck')
      .then((res) => res.json())
      .then((res) => {
        gen(res);
      });
  }
  /* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

  render() {
    const { randomDeck } = this.props;
    const { deckRotationX, deckRotationY } = this.state;
    const deckRotation = {
      transform: `rotateX(${deckRotationX}deg) rotateY(${deckRotationY}deg)`,
    };
    return (
      <div id="deck-ctrl">
        <div id="deck" style={deckRotation}>
          <h2 className="text-white text-border">Royal Clash</h2>
          <ul id="cards">
            {randomDeck.map((card) => (
              <li key={card._id}>
                <img src={`http://www.clashapi.xyz/images/cards/${card.idName}.png`} alt={card.name} />
              </li>
            ))}
          </ul>
          <p id="elixir-cost" className="text-violet text-border text-center">
            Average Elixir cost: 4.0
          </p>
        </div>
        <button
          type="button"
          onClick={this.generateRandomDeck}
        >
          Generate
        </button>
      </div>
    );
  }
}

Deck.propTypes = {
  randomDeck: PropTypes.shape([]).isRequired,
  gen: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
