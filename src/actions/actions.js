import * as constants from './actionTypes';

export const genRandom = (random) => ({
  type: constants.GEN_RANDOM,
  payload: random,
});

export const selectCard = (card) => ({
  type: constants.SELECT_CARD,
  payload: card,
});

export const togglePopup = (show, component) => ({
  type: constants.POPUP_TOGGLE,
  payload: {
    show, component,
  },
});
