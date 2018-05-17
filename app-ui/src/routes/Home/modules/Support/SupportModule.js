// @flow
import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { formReducer, modelReducer } from 'react-redux-form';

type RequestState = {
  isPending: boolean,
  isComplete: boolean,
  isSuccess: boolean,
}


export const initialRequestState: RequestState = {
  isPending: false,
  isComplete:false,
  isSuccess: false,
};



export type SupportHelp = {
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
}
const initialSupportHelp: SupportHelp = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export const modelPath = 'home.support.data';


export const sendSupport = createAction('HOME_SUPPORT_SEND');


export const requestPending = createAction('HOME_SUPPORT_REQUEST_PENDING');
export const requestSuccessful = createAction('HOME_SUPPORT_REQUEST_SUCCESSFUL');
export const requestFailed = createAction('HOME_SUPPORT_REQUEST_FAILED');
export const requestReset = createAction('HOME_SUPPORT_REQUEST_RESET');



export default combineReducers({
  request: handleActions({
    [requestPending]: () => ({ isPending: true, isComplete: false, isSuccess: false }),
    [requestSuccessful]: () => ({ isPending: false, isComplete: true, isSuccess: true }),
    [requestFailed]: () => ({ isPending: false, isComplete: true, isSuccess: false }),
    [requestReset]: () => initialRequestState,
  }, initialRequestState),
  form: formReducer(modelPath, initialSupportHelp),
  data: modelReducer(modelPath, initialSupportHelp)

})

