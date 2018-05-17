// @flow
import { createAction, handleActions } from 'redux-actions';
import type {Player} from "./Player";
import { noDupConcat } from "../../../../util/HelperUtil";

//type Formation = {attack: number, midfield: number, defence: number}
/**
 * BenchModule is the players store for a team.
 * All the players possibly in a team belong to the bench.
 * After a successful transfer,
 * a player can be added to the pitch formation(RoleModule) from the bench through the FieldRole {Marker}.
 */

export type BenchData = {
  [string]: Array<Player>
}

export const initialBenchData: BenchData = {};

export const fetchBenchPlayers = createAction('COACH_TEAM_BENCH_FETCH');

export const saveBenchPlayers = createAction('COACH_TEAM_BENCH_SAVE');
/**
 * Replaces a whole team list of players with the list of players provided
 * @param state
 * @param payload
 * @returns {{}}
 */
const formatSaveBench = (state = [], payload) => {
  const { teamID, data = [] } = payload;
  //const players = noDupConcat(state, data, (s, p) => s.id === p.id);
  if(teamID) {
    return { [teamID]: data }
  }
  return {};
};

export default handleActions({
  [saveBenchPlayers]: (state, action) => ({ ...state, ...formatSaveBench(state[action.payload.teamID], action.payload) }),// payload: { teamID: string, data: [player]  }
}, initialBenchData)