import * as constants from './actionTypes';

export const passCards = (cards) => ({
  type: constants.PASS_CARDS,
  payload: cards,
});

export const togglePopup = (show, component) => ({
  type: constants.POPUP_TOGGLE,
  payload: {
    show, component,
  },
});
