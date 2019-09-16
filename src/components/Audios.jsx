/* eslint-env browser */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleSound } from '../actions/actions';

import loopAudio from '../audios/2min_loop_battle_01.ogg';
import deckPopup from '../audios/60secs_training_Arena_01.ogg';
import copySuccess from '../audios/Scroll_win_01.ogg';
import cardSelect from '../audios/sword-select.mp3';
import genDeck from '../audios/gen-deck.wav';

import volume from '../assets/volume.png';
import mute from '../assets/mute.png';

const mapStateToProps = (state) => {
  const { sound } = state.commonReducer;
  return { sound };
};

const mapDispatchToProps = (dispatch) => ({
  soundSwitch: () => {
    dispatch(toggleSound());
  },
});

function Audios(props) {
  const { soundSwitch, sound } = props;
  return (
    <div id="audios">
      <audio id="bg-loop" autoPlay loop muted={!sound}>
        <source src={loopAudio} />
        <track
          default
          kind="captions"
          srcLang="en"
        />
      </audio>
      <audio id="deck-popup" muted={!sound}>
        <source src={deckPopup} />
        <track
          default
          kind="captions"
          srcLang="en"
        />
      </audio>
      <audio id="copy-success" muted={!sound}>
        <source src={copySuccess} />
        <track
          default
          kind="captions"
          srcLang="en"
        />
      </audio>
      <audio id="card-select" muted={!sound}>
        <source src={cardSelect} />
        <track
          default
          kind="captions"
          srcLang="en"
        />
      </audio>
      <audio id="gen-deck" muted={!sound}>
        <source src={genDeck} />
        <track
          default
          kind="captions"
          srcLang="en"
        />
      </audio>
      <button id="toggle-sound" title="Click to toggle sound" type="button" className={`btn-pointer ${sound ? '' : 'muted'}`} onClick={soundSwitch}>
        <img alt="Sound Toggle" src={sound ? volume : mute} />
      </button>
    </div>
  );
}

Audios.propTypes = {
  soundSwitch: PropTypes.func.isRequired,
  sound: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Audios);
