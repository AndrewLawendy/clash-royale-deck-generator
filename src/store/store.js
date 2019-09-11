import { createStore } from 'redux';
import allReducers from '../reducers/reducers';

const store = createStore(allReducers);

export default store;
