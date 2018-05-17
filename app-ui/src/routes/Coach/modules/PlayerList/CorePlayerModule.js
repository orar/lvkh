// @flow
import { combineReducers } from 'redux';
import playerDetailReducer from './PlayerDetailModule';
import playerListReducer from './PlayerListModule';
import playerMetaReducer from './PlayerMetaModule';


export default combineReducers({
  detail: playerDetailReducer,
  list: playerListReducer,
  meta: playerMetaReducer,
});