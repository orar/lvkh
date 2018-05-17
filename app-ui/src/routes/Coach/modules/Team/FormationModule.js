// @flow
import { createAction, handleActions } from 'redux-actions';
/**
 * Formation is the formation rule regulating RoleModule to bound the selection of players onto a pitch formation
 */
export type Formation = {
  id: string,
  name: string,
  forward: number,
  midfield: number,
  defence: number,
  goalkeep: number
}

/**
 * current Formation is the actual Formation rule used by the RoleModule from the backend service.
 * lockTime Unix millisecond timestamp is the stop time for changes to be made to a team.
 * A player should be added to the current formation before the lockTime is due.
 * data: a list of other formations that can be selected to replace the current formation.
 * Any changes to the current formation should be done before the lockTime.
 *
 * Current Formation is changed in a server call.
 */
export type FormationData = {
  [string]: {
    current: Formation,
    lockTime: number,
    data: Array<Formation>
  }
}

export const initialFormationData: FormationData = {};


export const fetchFormation = createAction('COACH_TEAM_FORMATION_FETCH');
export const changeFormation = createAction('COACH_TEAM_FORMATION_CHANGE');
export const saveFormation = createAction('COACH_TEAM_FORMATION_SAVE');

export default handleActions({
  [saveFormation]: (state, action) => ({...state, [action.payload.teamID]: action.payload.formation }) //payload: {teamID: '', formation: {current, lockTime, data} }
}, initialFormationData)
