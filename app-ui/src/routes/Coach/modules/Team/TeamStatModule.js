// @flow

import { createAction, handleActions } from 'redux-actions';
import { List } from 'immutable';
import {pushArray, noDupConcat} from "../../../../util/HelperUtil";

export type GameCard = { card: string, name: string, id: string, fixture: string}

export type GameFoul = {id: string, player: string, fixture: string}

export type Substitution = {id: string, field: {id: string, player: string}, bench: {id: string, player: string}}

export type TeamStat = {
  id: string,
  seasonID: string,
  teamID: string,
  size: number,
  prizes: Array<string>,
  substitutes: Array<Substitution>,
  cards: Array<GameCard>,
  fouls: Array<GameFoul>,
  performance: number,
}

export type TeamStatData = {
  data: Array<TeamStat>,
}

export const initialTeamStatData: TeamStatData = {
  data: [],
};


export const fetchStats = createAction('COACH_TEAM_STAT_FETCH');

export const saveStats = createAction('COACH_TEAM_STAT_SAVE');
export const deleteStat = createAction('COACH_TEAM_STAT_DELETE');

export default handleActions({
  [saveStats]: (state, action) => ({ data: noDupConcat(state.data, action.payload, (s, p) => s.id === p.id)}),
  [deleteStat]: (state, action) => ({ data: initialTeamStatData }),
}, initialTeamStatData)