// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPending: boolean,
  isComplete: boolean,
  isSuccess: boolean,

}

export type SignUpForm = {
  firstName: string,
  lastName: string,
  username: string,
  contact: string,
  password: string,
}

export const modelPath: string = 'auth.signUp.data';
export const requestState: RequestState = {
  isPending: false,
  isComplete: false,
  isSuccess: false,
};
export const formState: SignUpForm = {
  firstName: '',
  lastName: '',
  username: '',
  contact: '',
  password: '',
};

export const signUp = createAction('AUTH_SIGN_UP');
export const signUpPending = createAction('AUTH_SIGN_UP_PENDING');
export const signUpFulfilled = createAction('AUTH_SIGN_UP_FULFILLED');
export const signUpRejected = createAction('AUTH_SIGN_UP_REJECTED');

export default combineReducers({
  request: handleActions({
    [signUpPending]: () => ({ isPending: true, isComplete: false, isSuccess: false  }),
    [signUpFulfilled]: () => ({ isPending: false, isComplete: true, isSuccess: true   }),
    [signUpRejected]: () => ({ isPending: false, isComplete: true, isSuccess: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
