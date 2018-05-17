// @flow

import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';
import {combineSagas} from "../../../../util/Saga";
import {combineReducers} from 'redux';


export type PrivilegeRequestState = {
  isPending: boolean,
  isComplete: boolean,
  isSuccess: boolean
}

export const initialRequestState: PrivilegeRequestState = {
  isPending: false,
  isComplete: false,
  isSuccess: false,
};

export const privilegeRequestPending = createAction('COACH_GAME_PRIV_REQUEST_PENDING');
export const privilegeRequestSuccessful = createAction('COACH_GAME_PRIV_REQUEST_SUCCESSFUL');
export const privilegeRequestFailed = createAction('COACH_GAME_PRIV_REQUEST_FAILED');
export const resetPrivilegeRequest = createAction('COACH_GAME_PRIV_REQUEST_RESET');


export type PrivilegeRequest = {
    valid: boolean,
    message: string,
};

export const initialPrivilegeRequest: PrivilegeRequest = {
    valid: false,
    message: '',
};

export const requestPrivilege = createAction('COACH_GAME_CREATE_PRIV_REQ_SEND');
export const savePrivilegeResponse = createAction('COACH_GAME_CREATE_PRIV_REQ_SAVE');


export default combineReducers({
  request: handleActions({
    [privilegeRequestPending]: state => ({ ...state, isPending: true }),
    [privilegeRequestSuccessful]: () => ({ isPending: false, isComplete: true, isSuccess: true }),
    [privilegeRequestFailed]: () => ({ isPending: false, isComplete: true, isSuccess: false }),
    [resetPrivilegeRequest]: () => initialRequestState,
  }, initialRequestState),
  data: handleActions({
    [savePrivilegeResponse]: (state, action) => ({ valid: action.payload.valid, message: action.payload.message})
  }, initialPrivilegeRequest)
});