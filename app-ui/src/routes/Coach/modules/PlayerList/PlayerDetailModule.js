// @flow
import { createAction, handleActions } from 'redux-actions';
import { noDupConcat, pushArray } from "../../../../util/HelperUtil";

export type PlayerPerfHistory = {
  roundID: string,
  roundName: string,
  opponent: string,
  points: number,
  minutes: number,
  goalScore: number,
  assist: number,
  saves: number,
  ownGoal: number,
  goalConcede: number,
  cleanSheet: number,
  penaltySave: number,
  penaltyMiss: number,
  yellowCard: number,
  redCard: number
}

export type PlayerDetail = {
  id: string,
  seasonID: string,
  originID: string,
  originName: string,

  name: string,
  age: number,

  avatar: string,
  coverUrl: string,

  role: string,
  form: number,
  totalPoints: number,
  tsb: number,

  influence: number,
  creativity: number,
  threat: number,
  ictIndex: number,
  price: number,

  height: number,
  weight: number,

  evicted: boolean,
  rating: number,
  country: number,
  dateTime: number,
  history: Array<PlayerPerfHistory>,

}

export type PlayerDetailData = {
  [string]: PlayerDetail,
}

const initialPlayerDetail: PlayerDetailData = {};

export const getPlayerDetail = createAction('COACH_PLAYER_DETAIL_GET');
export const savePlayerDetail = createAction('COACH_PLAYER_DETAIL_SAVE');
export const resetPlayerDetail = createAction('COACH_PLAYER_DETAIL_RESET');


const formatSavePlayerDetail = (state, payload) => {
  const { id } = payload;
  return {[id]: payload }
};


export default handleActions({
  [savePlayerDetail]: (state, action) => ({...state, ...formatSavePlayerDetail(state[action.payload.id], action.payload)}),
  [resetPlayerDetail]: initialPlayerDetail,
}, initialPlayerDetail);