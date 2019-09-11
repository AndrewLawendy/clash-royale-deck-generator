import { combineReducers } from 'redux';

const randomReducer = (state = {}) => state;

const allReducers = combineReducers(randomReducer);

export default allReducers;
