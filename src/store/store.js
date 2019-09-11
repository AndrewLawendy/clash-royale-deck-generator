/* eslint-env browser */
import { createStore } from 'redux';
import allReducers from '../reducers/reducers';

/* eslint-disable no-underscore-dangle */
const store = createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */

export default store;
