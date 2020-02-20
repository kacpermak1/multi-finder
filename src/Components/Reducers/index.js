import { combineReducers } from 'redux';
import pictureReducer from './pictureReducer';
import movieReducer from './movieReducer';
import musicReducer from './musicReducer';
import appReducer from './appReducer';

const reducers = combineReducers({pictureReducer, movieReducer, musicReducer,appReducer})

export default reducers;