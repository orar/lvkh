// @flow
import { createAction, handleActions } from 'redux-actions';
import isEmpty from 'lodash/isEmpty';
import {isObjEmpty} from "../../../../util/HelperUtil";


/**
 *  A relative pitch coordinate of a dragged player on a Pitch.
 *  This is to create a free drag and drop placement of players dragged from bench
 */
export type PitchCoord = {
  x: number,
  //y: number,  z is y
  z: number,
}

/**
 * RoleMap contains data for accurate formation position of a player on a pitch.
 *
 * NOTE: on a new created team, there will not be RoleMap cos there are no transfers yet.
 * In such a case, a default formation is selected and prepopulated with seqId.
 * This would allow a flexible implementation of RoleMap in Scala.
 */
export type RoleMap = {
  seqId: string | number,
  id: string,
  captain: boolean,
  viceCaptain: boolean,
}

/**
 * RoleData is the formation form sent as data to in API calls.
 * This is the pitch formation of an active team.
 */
export type RoleData = {
  [string]: {
    forward: Array<RoleMap>,
    midfield: Array<RoleMap>,
    defence: Array<RoleMap>,
    goalkeep: Array<RoleMap>,
  }
}


export const initialRoleData: RoleData = {};

export const emptyRoleMap: RoleMap = {
  seqId: '',
  id: '',
  captain: false,
  viceCaptain: false,
};


export const fetchTeamRoles = createAction('COACH_TEAM_ROLE_FETCH');


/**
 * On {submitTeamRoles}, update RoleData, BenchModule.data
 */
export const submitTeamRoles = createAction('COACH_TEAM_ROLE_SUBMIT');

//replace* should have a structure of { field: string//newPlayer, bench: string//old player }


export const roleAdd = createAction('COACH_TEAM_ROLE_ADD');
export const roleRemove = createAction('COACH_TEAM_ROLE_REM');
export const roleReplace = createAction('COACH_TEAM_ROLE_REP');

export const makeCaptain = createAction('COACH_TEAM_ROLE_CAPTAIN');
export const makeViceCaptain = createAction('COACH_TEAM_ROLE_VICE_CAPTAIN');

export const clearRoles = createAction('COACH_TEAM_ROLE_CLEAR');

export const fillRoles = createAction('COACH_TEAM_ROLE_FILL');

//TODO merge addRole, replace & removeRole as abstract function
/**
 * Searches for only unoccupied playerID `id` slot in the role list and fixes a player in the slot by id.
 * If there is not empty id slot, no state is changed.
 *
 * payload: { teamID: 'e34c3a79d0efd', role: 'forward', id: 'eaef435ca4d3ef', coord: {x, y} }
 * @param state
 * @param payload
 * @returns {*}
 */
const addRole = (state, payload) => {
  let slot = state[payload.role].find(f => !f.id);
  if(!isObjEmpty(slot)){
    slot.id = payload.id;
    slot.coord = payload.coord;

    const filtered = state[payload.role].filter(f => f.seqId !== slot.seqId);
    filtered.push(slot);
    return Object.assign(state, { [payload.role]: filtered });
  }
};

/**
 * Searches for a slot in the role list by the slotID and
 * Replaces a player in the slot by id.
 *
 * payload: { teamID: 'e34c3a79d0efd', role: 'forward', roleId: 1, id: 'eaef435ca4d3ef' }
 * @param state
 * @param payload
 * @returns {*}
 */
const replaceRole  = (state, payload) => {
  console.log(state);
  console.log(payload);
    let slot = state[payload.role].find(f => f.seqId === payload.seqId);
    if(!isEmpty(slot)){
      slot.id = payload.id;
      slot.coord = payload.coord;
      const filtered = state[payload.role].filter(f => f.roleId !== slot.roleId);
      filtered.push(slot);
      return Object.assign(state, { [payload.role]: filtered });
    }
};


/**
 * Fill roles on page load/reload
 *
 * To ensure the user player order of selection and position data is  preserved from the server,
 * slotId would be saved as part of the formation. Therefore, a payload may contain as such
 *
 * payload: {
 *    teamID: 'e34c3a79d0efd',
 *    forward: [
 *        {
 *          slotId: '1',
 *          id: '3ead3e3f3ea4',
 *          captain?: false
 *        },
 *       ...
 *    ],
 *    defence: [], midfield: [], goalkeep: []
 * }
 *
 * slotID is incremental and sortable
 * @param payload
 */
const fillRolesFunc = (payload) => {
  const { teamID, forward, midfield, defence, goalkeep } = payload;
  if(teamID) {
    return {[teamID]: {goalkeep, defence, midfield, forward}};
  }
  return {};
};


/**
 * payload: { teamID: 'e34c3a79d0efd', role: 'forward', seqId: 1 }
 * @param state
 * @param payload
 * @returns {*}
 */
const removeRole = (state, payload) => {
  const { seqId, role } = payload;
  const slotExist = state[payload.role].some(f => f.seqId === payload.seqId);
  if(slotExist){
    const slot = { ...emptyRoleMap, seqId };
    const filtered = state[payload.role].filter(f => f.seqId !== seqId);
    filtered.push(slot);
    return {...state, [role]: filtered };
  }
};


/**
 * Assigns a captain to a slot in the formation.
 * If there be any captain already, that captain is decaptainized and new captain assigned
 * payload: { teamID: 'e32cce3', id: '3ea3f3d3e'}
 * @param state
 * @param payload
 * @returns {*}
 */
const captainize = (state, payload) => {
  let newState = Object.assign({}, state);
  const keys = Object.keys(newState);

  for(let i = 0; i < keys.length; i++){
     for(let j = 0; j < newState[keys[i]].length; j++){

       if(newState[keys[i]][j].captain) {
         newState[keys[i]][j].captain = false;
       }
       if(newState[keys[i]][j].id === payload.id){
         newState[keys[i]][j].captain = true;
       }
     }
  }
  return newState;
};

/**
 * Assigns a vice captain to a slot in the formation.
 * If there be any captain already, that vice captain is decaptainized and new vice captain assigned
 * payload: { teamID: 'e32cce3', id: '3ea3f3d3e'}
 * @param state
 * @param payload
 * @returns {*}
 */
const viceCaptainize = (state, payload) => {
  let newState = Object.assign({}, state);
  const keys = Object.keys(newState);

  for(let i = 0; i < keys.length; i++){
     for(let j = 0; j < newState[keys[i]].length; j++){
       if(newState[keys[i]][j].viceCaptain) {
         newState[keys[i]][j].viceCaptain = false;
       }
       if(newState[keys[i]][j].id === payload.id){
         newState[keys[i]][j].viceCaptain = true;
       }
     }
  }
  return newState;
};

export default handleActions({
  [roleAdd]: (state, action) => ({ ...state, [action.payload.teamID]: addRole(state[action.payload.teamID], action.payload)  }), // payload: { teamID: 'e34c3a79d0efd', role: 'forward', id: 'eaef435ca4d3ef' }
  [roleReplace]: (state, action) => ({ ...state, [action.payload.teamID]: replaceRole(state[action.payload.teamID], action.payload) }), // payload: { teamID: 'e34c3a79d0efd', role: 'forward', roleId: 1, id: 'eaef435ca4d3ef' }
  [roleRemove]: (state, action) => ({ ...state, [action.payload.teamID]: removeRole(state[action.payload.teamID], action.payload) }), // payload: { teamID: 'e34c3a79d0efd', role: 'forward', roleId: 1 }
  [makeCaptain]: (state, action) => ({ ...state, [action.payload.teamID]: captainize(state[action.payload.teamID], action.payload)}), //payload: { teamID: 'e32cce3', id: '3ea3f3d3e'}
  [makeViceCaptain]: (state, action) => ({ ...state, [action.payload.teamID]: viceCaptainize(state[action.payload.teamID], action.payload)}), //payload: { teamID: 'e32cce3', id: '3ea3f3d3e'}
  [fillRoles]: (state, action) => ({ ...state, ...fillRolesFunc(action.payload) }),
  [clearRoles]: (state, action) => initialRoleData,
}, initialRoleData)
