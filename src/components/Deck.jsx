/* eslint-env browser */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { passCards, togglePopup } from '../actions/actions';

import Card from './Card';
import CardInfo from './CardInfo';
import DeckStats from './DeckStats';
import CustomDeck from './CustomDeck';

import elixirPng from '../assets/elixir.png';

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

class Deck extends Component {
  constructor(props) {
    super(props);
    this.generateRandomDeck = this.generateRandomDeck.bind(this);
    this.followingDeck = this.followingDeck.bind(this);
    this.generateCustomDeck = this.generateCustomDeck.bind(this);
    this.state = {
      deckRotationX: 0,
      deckRotationY: 0,
      reflectionX: 0,
    };
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.followingDeck);
    const { cards = '' } = queryString.parse(window.location.search);
    if (cards) this.generateCustomDeck(cards.split(','));
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.followingDeck);
  }

  followingDeck(e) {
    const middleWidth = window.innerWidth / 2;
    const rotateY = (e.clientX - middleWidth) / 200;
    const rotateX = (e.clientY - (window.innerHeight / 2)) / 180;
    const reflectionX = ((e.clientX - middleWidth) / 50);
    this.setState(() => ({
      deckRotationX: rotateX,
      deckRotationY: rotateY,
      reflectionX,
    }));
  }

  generateCustomDeck(ids) {
    const { gen } = this.props;
    const cards = [];
    Promise.all(ids.forEach((id) => {
      fetch(`http://www.clashapi.xyz/api/cards/${id}`)
        .then((res) => res.json())
        .then((res) => cards.push(res));
    }))
      .then(
        gen(cards),
      );
  }

  generateRandomDeck() {
    const { gen } = this.props;
    fetch('http://www.clashapi.xyz/api/random-deck')
      .then((res) => res.json())
      .then((res) => {
        gen(res);
      });
  }

  render() {
    const { filteredDeck, openPopup } = this.props;
    const { deckRotationX, deckRotationY, reflectionX } = this.state;
    const filteredQueryString = filteredDeck.map((card) => card._id).join(',');
    const deckRotation = {
      transform: `rotateX(${deckRotationX}deg)
       rotateY(${deckRotationY}deg)`,
    };
    const reflectionXLeft = {
      left: reflectionX - 120,
    };
    const averageElixir = (filteredDeck.reduce((acc, curr) => acc + curr.elixirCost, 0) / (filteredDeck.length || 1)).toFixed(1);

    /* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

    return (
      <div id="deck-ctrl">
        <p>{filteredQueryString}</p>
        <div id="deck" style={deckRotation}>
          <div id="deck-reflection" style={reflectionXLeft} />
          <h2 className="text-white text-border">Clash Royale</h2>
          <ul className="cards-container">
            {filteredDeck.map((card) => (
              <li className="btn-pointer" key={card._id} onClick={() => openPopup(<CardInfo card={card} />)} role="presentation">
                <Card card={card} />
              </li>
            ))}
          </ul>
          <p id="elixir-cost" className="text-violet text-border text-center">
            {`Average Elixir cost: ${averageElixir}`}
            {
              filteredDeck.length ? (
                <img
                  src={elixirPng}
                  alt="Elixir"
                  className="btn-pointer"
                  onClick={() => openPopup(<DeckStats cards={filteredDeck} />)}
                  title="Click to get the deck stats!"
                  role="presentation"
                />
              ) : (
                <img
                  src={elixirPng}
                  alt="Elixir"
                />
              )
            }
          </p>
        </div>
        <div id="deck-btns-ctrl">
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
            onClick={this.generateRandomDeck}
            id="generate-random"
            className="btn btn-yellow"
          >
            Generate
          </button>
        </div>
      </div>
    );
  }
}

Deck.propTypes = {
  filteredDeck: PropTypes.arrayOf(PropTypes.object).isRequired,
  gen: PropTypes.func.isRequired,
  openPopup: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
