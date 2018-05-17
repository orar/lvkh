// @flow
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';
import { combineReducers } from 'redux';

type RequestState = {
  isPending: boolean,
  isComplete: boolean,
  isSuccess: boolean,
}

export type ProfileForm = {
  id: string,
  userID: string,
  username: string,
  firstName: string,
  midName : string,
  lastName: string,
  alias: string,
  address: string,
  city: string,
  avatar: string,
  cover: string,
  country: string,
  statusMsg: string,
}

export const initialRequestState: RequestState = {
  isPending: false,
  isComplete:false,
  isSuccess: false,
};

export const modelPath = 'user.profileForm.data';
export const initialProfileForm  = {};

// './ProfileModule' is for the various profile views on other users. ProfileForm is dedicated to the
//authenticated user only to edit Profile.

export const commitProfile = createAction('USER_PROFILE_COMMIT');

export const editProfile = createAction('USER_PROFILE_EDIT');

export const requestPending = createAction('USER_PROFILE_REQUEST_PENDING');
export const requestSuccessful = createAction('USER_PROFILE_REQUEST_SUCCESSFUL');
export const requestFailed = createAction('USER_PROFILE_REQUEST_FAILED');
export const requestReset = createAction('USER_PROFILE_REQUEST_RESET');


export default combineReducers({
  request: handleActions({
    [requestPending]: () => ({ isPending: true, isComplete: false, isSuccess: false }),
    [requestSuccessful]: () => ({ isPending: false, isComplete: true, isSuccess: true }),
    [requestFailed]: () => ({ isPending: false, isComplete: true, isSuccess: false }),
    [requestReset]: () => initialRequestState,
  }, initialRequestState),
  form: formReducer(modelPath, initialProfileForm),
  data: modelReducer(modelPath, initialProfileForm)

})


