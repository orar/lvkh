// @flow
import { createAction, handleActions } from 'redux-actions';
import { pushList } from "../../../../util/HelperUtil";
import { noDupConcat } from "../../../../util/HelperUtil";

export type OpenTabs = Array<string>

/**
 * id ID of the team
 * userID ID of the team user owner
 * username ID of the team user owner
 * seasonID id of a season, league or tournament eg. wc russia2018, epl, la liga
 * size Size of team, ie, total number of players. This is equal to size of bench
 * readOnly A flag to set the team as readOnly.
 *  used to lock access control.
 *  readOnly is only false if the user is the owner of the team
 *  and owner has privilege to make changes to the team
 * openTabs A list of tabs to control team data accessible to the user.
 *  If the user is not owner of team, openTabs will be filtered else will not be filtered
 * expiry A timestamp when the team will locked out entirely. This is usually end of game period or end of season
 */
export type Team = {
  id: string,
  userID: string,
  username: string,
  seasonID: string,
  size: number,
  name: string,
  readOnly: boolean,
  openTabs: OpenTabs,
  expiry: number,
  dateTime: number,
}

//[username]: Array<Team>

/*
export type TeamData = {
  [string]: Array<Team>
}
*/
export type TeamData = {
  data: Array<Team>,
}

export const initialTeam: TeamData = {
  data: [],
};

export const getTeam = createAction('COACH_TEAM_GET');
export const fetchTeam = createAction('COACH_TEAM_FETCH');
export const fetchUserTeams = createAction('COACH_USER_TEAM_FETCH');


export const saveTeam = createAction('COACH_TEAM_SAVE');
export const saveTeams = createAction('COACH_TEAM_SAVE_ALL');
export const deleteTeam = createAction('COACH_TEAM_DELETE');

export default handleActions({
  [saveTeams]: (state, action) => ({ ...state, data: noDupConcat(state.data, action.payload, (s, p) => s.id === p.id) }),
  [deleteTeam]: (state, action) => initialTeam,
}, initialTeam)