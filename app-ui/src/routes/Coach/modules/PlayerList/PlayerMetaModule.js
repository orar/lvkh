// @flow
import { createAction, handleActions } from 'redux-actions';
import {combineReducers} from "redux";

export type RequestState = {
  isPending: boolean,
}

export type PlayerListSearchForm = {
  data: string,
}

export type RoleExhaust = {
  [string]: boolean,
}


const initialRequestState = {
  isPending: false,
};

const initialRoleExhaust: RoleExhaust = {};

const initialSearchForm: PlayerListSearchForm = {
  data: '',
};



export const requestPending = createAction('COACH_PLAYER_LIST_REQUEST_PENDING');

export const requestComplete = createAction('COACH_PLAYER_LIST_REQUEST_COMPLETE');

export const roleExhausted = createAction('COACH_PLAYER_LIST_ROLE_EXHAUST');

export const searchPlayerList = createAction('COACH_PLAYER_LIST_SEARCH');



export default combineReducers({
  search: handleActions({
    [searchPlayerList]: (state, action) => ({data: action.payload }),
  }, initialSearchForm),
  request: handleActions({
    [requestPending]: () => ({ isPending: true }),
    [requestComplete]: () => ({ isPending: false }),
  }, initialRequestState),
  exhaust: handleActions({
    [roleExhausted]: (state, action) => ({ ...state, [action.payload]: true }),
  }, initialRoleExhaust)
})