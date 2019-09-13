/* eslint-env browser */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleSound } from '../actions/actions';
import Deck from './Deck';
import PopUp from './PopUp';
import loopAudio from '../audios/2min_loop_battle_01.ogg';

const mapStateToProps = (state) => {
  const { popupShow, sound } = state.commonReducer;
  return { popupShow, sound };
};

const mapDispatchToProps = (dispatch) => ({
  soundSwitch: () => {
    dispatch(toggleSound());
  },
});

function App(props) {
  const { popupShow, soundSwitch } = props;

  return (
    <div>
      <div id="main-gradient" />
      <Deck />
      {popupShow && <PopUp />}
      <div id="audios">
        <button type="button" onClick={soundSwitch}>Mute</button>
        <audio loop>
          <source src={loopAudio} />
          <track
            default
            kind="captions"
            srcLang="en"
          />
        </audio>
      </div>
    </div>
  );
}

App.propTypes = {
  popupShow: PropTypes.bool.isRequired,
  soundSwitch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
