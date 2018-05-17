// @flow

import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';


export type RequestState = {
  isPending: boolean,
  isComplete: boolean,
  isSuccess: boolean
}

export type UpdateTeamForm = {
  teamID: string,
  name: string,
}


export const modelPath: string = 'coach.team.data';

export const initialRequestState: RequestState = {
  isPending: false,
  isComplete: false,
  isSuccess: false,
};

export const initialTeamForm: UpdateTeamForm = {
  teamID: '',
  name: '',
};

export const updateTeam = createAction('COACH_TEAM_FORM_SEND');

export const updateTeamRequestPending = createAction('COACH_TEAM_REQUEST_PENDING');
export const updateTeamRequestSuccessful = createAction('COACH_TEAM_REQUEST_SUCCESSFUL');
export const updateTeamRequestFailed = createAction('COACH_TEAM_REQUEST_FAILED');


export default handleActions({
    [updateTeamRequestPending]: state => ({ ...state, isPending: true }),
    [updateTeamRequestSuccessful]: () => ({isPending: false, isComplete: true, isSuccess: true }),
    [updateTeamRequestFailed]: () => ({isPending: false, isComplete: true, isSuccess: false }),
  }, initialRequestState);