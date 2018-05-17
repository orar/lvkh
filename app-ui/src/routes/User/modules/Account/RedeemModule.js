// @flow
import { createAction, handleActions } from 'redux-actions';


export type RequestState = {
  isPending: boolean,
  isComplete: boolean,
  isSuccess: boolean,
}


const initialRequestState = {
  isPending: false,
  isComplete: false,
  isSuccess: false,

};

export const redeemReward = createAction('USER_ACCOUNT_REDEEM_REWARD');

export const requestPending = createAction('USER_ACCOUNT_REDEEM_REQUEST_PENDING');
export const requestSuccessful = createAction('USER_ACCOUNT_REDEEM_REQUEST_SUCCESSFUL');
export const requestFailed = createAction('USER_ACCOUNT_REDEEM_REQUEST_FAILED');


export default handleActions({
  [requestPending]: () => ({ isPending: true, isComplete: false, isSuccess: false}),
  [requestSuccessful]: () => ({ isPending: false, isComplete: true, isSuccess: true}),
  [requestFailed]: () => ({ isPending: false, isComplete: true, isSuccess: false}),
}, initialRequestState);