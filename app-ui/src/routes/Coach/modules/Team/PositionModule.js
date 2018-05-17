// @flow
import { createAction, handleActions } from 'redux-actions';
import isEmpty from 'lodash/isEmpty';
/**
 * @deprecated PositionModule is no longer useful
 */
export type Position = {
  coord: { x: number, z: number },
}

type PositionData = {
  [string]: Position
}

export const initialPositionData: PositionData = {};

export const setCoord = createAction('COACH_TEAM_POSITION_SET_COORD');

export const resetCoord = createAction('COACH_TEAM_POSITION_RESET_COORD');

const saveCoord = (state = {}, payload) => {
  const { x, z, teamID } = payload;
  state.coord = { x, z };
  console.log(state);
  return { [teamID]: state };
};

const clearCoord = (state = {}, payload) => {
  const { teamID } = payload;
  state.coord = { x: 0, z: 0 };
  console.log(state);
  return { [teamID]: state };
};

export default handleActions({
  [setCoord]: (state, action)  => ({ ...state, ...saveCoord(state[action.payload.teamID], action.payload) }),
  [resetCoord]: (state, action) => ({ ...state,  ...clearCoord(state[action.payload.teamID], action.payload) }),
}, initialPositionData)