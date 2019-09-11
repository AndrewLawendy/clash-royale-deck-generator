import { combineReducers } from 'redux';
import * as constants from '../actions/actionTypes';

const initState = {
  randomDeck: [],
};

const randomReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.GEN_RANDOM:
      return {
        ...state,
        randomDeck: action.payload,
      };
    default:
      return state;
  }
};

const allReducers = combineReducers({ randomReducer });

export default allReducers;
