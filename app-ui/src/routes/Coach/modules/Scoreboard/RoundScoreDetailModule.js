// @flow
import { createAction, handleActions } from 'redux-actions';
import {noDupConcat} from "../../../../util/HelperUtil";

export type TeamScore = {
  id: string,
  userID: string,
  seasonID: string,
  roundID: string,
  avatar: string,
  name: string,
  teamName: string,
  teamID: string,
  username: string,
  score: number,
  position: number,
  location: string,
}


export type RoundScoreDetail = {
  [string]: {
    [string]: {
      global: Array<TeamScore>,
      local: Array<TeamScore>,
      friend: Array<TeamScore>
    }
  }
}



export const initialDetailData: RoundScoreDetail = {};

/**
 * payload: { teamID: [string] }
 */
export const fetchRoundScoreDetail = createAction('COACH_ROUND_SCORE_LIST_FETCH');

/**
 * saveRoundScoreDetail assigns a TeamScore list...
 * payload: {
    teamID: string,
    roundID: string,
    global: Array<TeamScore>,
    local: Array<TeamScore>,
    friend: Array<TeamScore>
  }
 */
export const saveRoundScoreDetail = createAction('COACH_ROUND_SCORE_LIST_SAVE');

//Sets the State to initialDetailList
export const clearPlayerList = createAction('COACH_ROUND_SCORE_LIST_CLEAR');


const formatSaveRoundDetail = (state = {}, payload: Object) => {
  const { teamID, roundID, global, local, friend } = payload;
  const roundState = { ...state, [roundID]: { global, local, friend }};
  return { [teamID]:  roundState };
};

const formatAppendGlobalRoundDetail = () => {};
const formatAppendLocalRoundDetail = () => {};
const formatAppendFriendRoundDetail = () => {};

export default handleActions({
  [saveRoundScoreDetail]: (state, action) => ({ ...state, ...formatSaveRoundDetail(state[action.payload.teamID], action.payload)}),
  [clearPlayerList]: () => initialDetailData
}, initialDetailData);
