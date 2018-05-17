// @flow

import {createAction, handleActions } from 'redux-actions';
import {pushArray, noDupConcat} from "../../../../util/HelperUtil";
import omit from 'lodash/omit';

export type Deal = {
  id: string,
  teamID: string,
  playerID: string,
  playerName: string,
  playerAvatar: string,
  amount: number,
  out: boolean,
  dateTime: number
}

export type DealData = {
  [string]: {
    total: number,
    data: Array<Deal>,
  }
};

export const initialDealData: DealData = {};


export const getTeamDeals = createAction('COACH_BUDGET_GET');

export const saveTeamDeals = createAction('COACH_BUDGET_SAVE');
export const deleteTeamDeals = createAction('COACH_BUDGET_DELETE');


const formatSaveDeals = (state = {}, payload) => {
  const { teamID, total, data } = payload;
  const newData = noDupConcat(state.data, data, (s, p) => s.id === p.id);
  return {[teamID]: { total, data: newData }};
};


export default handleActions({
  [saveTeamDeals]: (state, action) => ({ ...state, ...formatSaveDeals(state[action.payload.teamID], action.payload) }), // payload: { [teamID]: {total: 32, data: [] }}
  [deleteTeamDeals]: (state, action) => omit(state, action.payload),
}, initialDealData)
