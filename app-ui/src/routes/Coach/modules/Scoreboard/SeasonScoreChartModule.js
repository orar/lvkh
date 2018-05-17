// @flow
import { createAction, handleActions } from 'redux-actions';
import { noDupConcat } from "../../../../util/HelperUtil";
import isNil from 'lodash/isNil';

export type PlayerScore = {
  id: string,
  name: string,
  avatar: string,
  score: number,
}

export type SeasonScoreChart = {
  [string]: {
    [string]: {
      name: string,
      chart: Array<PlayerScore>

    }}
};

export const initialSeasonScoreChart: SeasonScoreChart = {};


export const fetchSeasonScoreChart = createAction('COACH_SCORE_SEASON_CHART_FETCH');
export const saveSeasonScoreChart = createAction('COACH_SCORE_SEASON_CHART_SAVE');
export const resetSeasonScoreChart = createAction('COACH_SCORE_SEASON_CHART_RESET');

type Payload = {
  teamID: string,
  data: Array<{ roundID: string, name: string, chart: Array<PlayerScore> }>

}
/**
 * payload structure
 *
 * @param state
 * @param payload
 * @returns {{}}
 */
const formatSaveScoreChart = (state = {}, payload: Payload) => {
  const { teamID , data } = payload;
  const newState = state;
  data.map(d => {
    let chart = d.chart;
    if(!isNil(newState[d.roundID])){
      chart = noDupConcat(state[d.roundID], data, (s, p) => s.id === p.id)
    }
    newState[d.roundID] = {name: d.name, chart};
  });
  return { [teamID]: newState };
};


export default handleActions({
  [saveSeasonScoreChart]: (state, action) => ({ ...state, ...formatSaveScoreChart(state[action.payload.teamID], action.payload)}),
  [resetSeasonScoreChart]: () => initialSeasonScoreChart,
}, initialSeasonScoreChart);