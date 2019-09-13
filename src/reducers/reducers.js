import { combineReducers } from 'redux';
import * as constants from '../actions/actionTypes';

const filteredInitState = {
  filteredDeck: [],
};

const commonInitState = {
  popupShow: false,
  popupComponent: null,
  sound: false,
};

const filteredReducer = (state = filteredInitState, action) => {
  switch (action.type) {
    case constants.PASS_CARDS:
      return {
        ...state,
        filteredDeck: action.payload,
      };
    default:
      return state;
  }
};

const commonReducer = (state = commonInitState, action) => {
  switch (action.type) {
    case constants.POPUP_TOGGLE:
      return {
        ...state,
        popupShow: action.payload.show,
        popupComponent: action.payload.component,
      };
    case constants.SOUND_TOGGLE:
      return {
        ...state,
        sound: !state.sound,
      };
    default:
      return state;
  }
};

const allReducers = combineReducers({ filteredReducer, commonReducer });

export default allReducers;
