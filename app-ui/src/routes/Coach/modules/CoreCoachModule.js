import { combineReducers } from 'redux';
import teamReducer from './Team/CoreTeamModule';
import dealReducer from './Deal/DealModule';
import gameReducer from './Game/CoreGameModule';
import scoreReducer from './Scoreboard/ScoreModule';
import playerListReducer from './PlayerList/CorePlayerModule';
import transferReducer from './Transfer/TransferModule';
import coachReducer from './Coach/CoachModule';
import countryListReducer from './CountryList/CountryListModule';

export default combineReducers({
  coach: coachReducer,

  country: countryListReducer,

  //deal: dealReducer,

  game: gameReducer,

  player: playerListReducer,

  score: scoreReducer,

  team: teamReducer,
  transfer: transferReducer,

});
