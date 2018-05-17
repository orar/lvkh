// @flow

import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';
import {combineSagas} from "../../../../util/Saga";
import {combineReducers} from 'redux';


export type RequestState = {
  isPending: boolean,
  isComplete: boolean,
  isSuccess: boolean
}

export const initialRequestState: RequestState = {
  isPending: false,
  isComplete: false,
  isSuccess: false,
};

export const createTeamRequestPending = createAction('COACH_TEAM_REQUEST_PENDING');
export const createTeamRequestSuccessful = createAction('COACH_TEAM_REQUEST_SUCCESSFUL');
export const createTeamRequestFailed = createAction('COACH_TEAM_REQUEST_FAILED');
export const resetTeamRequest = createAction('COACH_TEAM_REQUEST_RESET');


export const createTeam = createAction('COACH_TEAM_FORM_SEND');


export default handleActions({
    [createTeamRequestPending]: state => ({ ...state, isPending: true }),
    [createTeamRequestSuccessful]: () => ({ isPending: false, isComplete: true, isSuccess: true }),
    [createTeamRequestFailed]: () => ({ isPending: false, isComplete: true, isSuccess: false }),
    [resetTeamRequest]: () => initialRequestState,
  }, initialRequestState);