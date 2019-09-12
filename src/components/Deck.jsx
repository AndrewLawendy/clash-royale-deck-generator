/* eslint-env browser */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { genRandom } from '../actions/actions';
import elixirPng from '../assets/elixir.png';

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
      reflectionX: 0,
    };
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.followingDeck);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.followingDeck);
  }

  followingDeck(e) {
    const middleWidth = window.innerWidth / 2;
    const rotateY = (e.clientX - middleWidth) / 160;
    const rotateX = (e.clientY - (window.innerHeight / 2)) / 140;
    const reflectionX = ((e.clientX - middleWidth) / 50);
    this.setState(() => ({
      deckRotationX: rotateX,
      deckRotationY: rotateY,
      reflectionX,
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
    const { deckRotationX, deckRotationY, reflectionX } = this.state;
    const deckRotation = {
      transform: `rotateX(${deckRotationX}deg)
       rotateY(${deckRotationY}deg)`,
    };
    const reflectionXLeft = {
      left: reflectionX - 120,
    };
    const averageElixir = (randomDeck.reduce((acc, curr) => acc + curr.elixirCost, 0) / 8).toFixed(1);

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
      <div id="deck-ctrl">
        <div id="deck" style={deckRotation}>
          <div id="deck-reflection" style={reflectionXLeft} />
          <h2 className="text-white text-border">Royal Clash</h2>
          <ul id="cards">
            {randomDeck.map((card) => (
              <li key={card._id}>
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
              </li>
            ))}
          </ul>
          <p id="elixir-cost" className="text-violet text-border text-center">
            {`Average Elixir cost: ${averageElixir}`}
            <img src={elixirPng} alt="Elixir" className={randomDeck.length ? 'btn-pointer' : ''} />
          </p>
        </div>
        <button
          type="button"
          onClick={this.generateRandomDeck}
          id="generate-random"
          className="text-white"
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
