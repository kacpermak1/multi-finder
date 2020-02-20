import { combineReducers } from 'redux';
import pictureReducer from './pictureReducer';
import movieReducer from './movieReducer';
import musicReducer from './musicReducer'

const reducers = combineReducers({pictureReducer, movieReducer, musicReducer})

export default reducers;