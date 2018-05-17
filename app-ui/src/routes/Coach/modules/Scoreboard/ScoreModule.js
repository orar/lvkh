// @flow
import { combineReducers } from 'redux';
import boardReducer from './ScoreBoardModule';
import roundScoreReducer from './RoundScoreDetailModule';
import seasonScoreChart from './SeasonScoreChartModule';

export default combineReducers({
  board: boardReducer,
  roundScore: roundScoreReducer,
  seasonChart: seasonScoreChart,
});