// @flow
import { createAction, handleActions } from 'redux-actions';
import { noDupConcat } from "../../../../util/HelperUtil";

export type SeasonScoreStat = {
  id: string,
  userID: string,
  seasonID: string,
  teamID: string,
  score: number,

  globalScore: number,
  globalUserID: string,
  globalUser: string,
  globalTeam: string,
  globalAvatar: string,
  globalLocation: string,
  globalPosition: number,
  lastGlobalPosition: number,

  localName: string,
  localScore: number,
  localUserID: string,
  localUser: string,
  localTeam: string,
  localAvatar: string,
  localLocation: string,
  localPosition: number,
  lastLocalPosition: number,

  averageIndex: number,
  increment: boolean,
  startDate: number,
  endDate: number,
}

export type RoundScoreStat = {
  id: string,
  userID: string,
  seasonID: string,
  teamID: string,
  roundID: string,
  roundName: string,
  score: number,

  globalScore: number,
  globalUserID: string,
  globalUser: string,
  globalTeam: string,
  globalAvatar: string,
  globalLocation: string,
  globalPosition: number,
  lastGlobalPosition: number,

  localName: string,
  localScore: number,
  localUserID: string,
  localUser: string,
  localTeam: string,
  localAvatar: string,
  localLocation: string,
  localPosition: number,
  lastLocalPosition: number,

  averageIndex: number,
  increment: boolean,
  startDate: number,
  endDate: number,
}

export type RoundScore = {
  id: string,
  teamID: string,
  userID: string,
  seasonID: string,
  roundID: string,
  roundName: string,
  roundCoverUrl: string,
  score: number,

  globalScore: number,
  globalPosition: number,

  localName: string,
  localScore: number,
  localPosition: number,

  currentRound: boolean,

  startDate: number,
  endDate: number,
  dateCreated: number,
}



export type ScoreBoard = {
  [string]: {
    seasonChart: SeasonScoreStat,
    roundChart: RoundScoreStat,
    round: Array<RoundScore>,
  }
}

export const initialScoreBoard: ScoreBoard = {};

export const fetchScores = createAction('COACH_PLAYER_SCORE_LIST_GET');
export const fetchRoundScore = createAction('COACH_PLAYER_SCORE_STAT_GET');

export const saveScoreChart = createAction('COACH_PLAYER_SCORE_STAT_SAVE');
export const saveRoundScores = createAction('COACH_PLAYER_SCORE_LIST_SAVE');

export const removeScore = createAction('COACH_PLAYER_SCORE_REMOVE');

const saveChartStat = (payload) => {
  const { teamID, seasonChart, roundChart, round } = payload;
  return { [teamID]: {seasonChart, roundChart, round} };
};

const addRoundScore = (state, payload) => {
  const { teamID, round: data } = payload;
  const round = noDupConcat(state.round, data, (s, p) => s.roundID === p.roundID);
  const newState = Object.assign(state, {round: round });
  return { [teamID]: newState }
};

export default handleActions({
  [saveScoreChart]: (state, action) => ({...state, ...saveChartStat(action.payload) }), //payload: { teamID: '3e4a3d3fe', seasonChart: {}, roundChart: {}, round: [] }
  [saveRoundScores]: (state, action) => ({...state, ...addRoundScore(state[action.payload.teamID], action.payload)}), //payload: {teamID: '3e4a3d3fe', round: [] }
}, initialScoreBoard);