import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Deck from './Deck';
import PopUp from './PopUp';
import loopAudio from '../audios/2min_loop_battle_01.ogg';

const mapStateToProps = (state) => {
  const { popupShow } = state.commonReducer;
  return { popupShow };
};

function App(props) {
  const { popupShow } = props;
  return (
    <div>
      <div id="main-gradient" />
      <Deck />
      { popupShow && <PopUp />}
      <div id="audios">
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
};

export default connect(mapStateToProps)(App);
