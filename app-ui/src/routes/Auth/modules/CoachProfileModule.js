// @flow

import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';
import {combineReducers} from 'redux';


export type CoachProfileForm = {
  //id: sting,
  firstName: string,
  midName: string,
  lastName: string,
  //username: string,
  contact: string,
  age: number,
  city: string,
  state: string,
  country: string
  //dateTime: number,
}

export type RequestState = { isPending: boolean }

export const modelPath: string = 'auth.coach.data';
export const initialRequestState: RequestState = { isPending: false };
export const initialCoachProfileForm = {
  firstName: '',
  midName: '',
  lastName: '',
  contact: '',
  age: 1,
  city: '',
  state: '',
  country: ''
};

export const updateProfile = createAction('AUTH_COACH_PROFILE_UPDATE');

export const requestPending = createAction('AUTH_COACH_PROFILE_REQUEST_PENDING');
export const requestSuccessful = createAction('AUTH_COACH_PROFILE_REQUEST_SUCCESSFUL');
export const requestFailed = createAction('AUTH_COACH_PROFILE_REQUEST_FAILED');


export default combineReducers({
  request: handleActions({
    [requestPending]: () => ({ isPending: true }),
    [requestSuccessful]: () => ({ isPending: false }),
    [requestFailed]: () => ({ isPending: false }),
  }, initialCoachProfileForm),
  form: formReducer(modelPath, initialCoachProfileForm),
  model: modelReducer(modelPath, initialCoachProfileForm),
});