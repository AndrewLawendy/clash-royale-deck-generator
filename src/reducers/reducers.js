import { combineReducers } from 'redux';
import * as constants from '../actions/actionTypes';

const randomInitState = {
  randomDeck: [],
  selectedCard: {},
};

const commonInitState = {
  popupShow: false,
  popupComponent: null,
};

const randomReducer = (state = randomInitState, action) => {
  switch (action.type) {
    case constants.GEN_RANDOM:
      return {
        ...state,
        randomDeck: action.payload,
      };
    case constants.SELECT_CARD:
      return {
        ...state,
        selectedCard: action.payload,
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
    default:
      return state;
  }
};

const allReducers = combineReducers({ randomReducer, commonReducer });

export default allReducers;
