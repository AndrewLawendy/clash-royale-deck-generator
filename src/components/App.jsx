/* eslint-env browser */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Deck from './Deck';
import PopUp from './PopUp';
import Audios from './Audios';


const mapStateToProps = (state) => {
  const { popupShow, sound } = state.commonReducer;
  return { popupShow, sound };
};


function App(props) {
  const { popupShow } = props;

  return (
    <div>
      <div id="main-gradient" />
      <Deck />
      {popupShow && <PopUp />}
      <Audios />
    </div>
  );
}

App.propTypes = {
  popupShow: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
