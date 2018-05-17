// @flow
import { createAction, handleActions } from 'redux-actions';

export type TransferForm = {
  teamID: string,
  playerID: string,
};

export type RequestState = {
  isPending: boolean,
  isComplete: boolean,
  isSuccess: boolean,
};

//export const modelPath: string = 'coach.transfer.request';
export const initialRequestState: RequestState = {
  isPending: false,
  isComplete: false,
  isSuccess: false,
};

export const makeTransfer = createAction('COACH_TRANSFER_SEND');

export const requestPending = createAction('COACH_TRANSFER_PENDING');
export const requestSuccessful = createAction('COACH_TRANSFER_SUCCESSFUL');
export const requestFailed = createAction('COACH_TRANSFER_FAILED');


export default handleActions({
    [requestPending]: state => ({ ...state, isPending: true}),
    [requestSuccessful]: state => ({ ...state, isPending: false, isSuccess: true}),
    [requestFailed]: state => ({ ...state, isPending: false, isSuccess: false}),
  }, initialRequestState);