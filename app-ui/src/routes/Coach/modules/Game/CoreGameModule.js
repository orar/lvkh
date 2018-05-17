// @flow
import { combineReducers } from 'redux';
import gameReducer from './GameModule';
import newTeamFormReducer from './CreateTeamFormModule';
import privilegeReducer from './GamePrivilegeModule';


export default combineReducers({
  game: gameReducer,
  createTeamForm: newTeamFormReducer,
  privilege: privilegeReducer,
});