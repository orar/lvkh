// @flow
import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { Set } from 'immutable';
import type { Player } from "../PlayerModule";

export type CommentForm = {
  threadID: string,
  userID: string,
  teamID: string,
  roundID: string,
  seasonID: string,
  username: string,
  comment: string,
  edit: boolean,
  reply: boolean,
}

export type RequestState = {
  isPending: boolean,
  isSuccess: boolean,
};

export const modelPath: string = 'coach.transfer.data';
export const initialRequestState: RequestState = {
  isPending: false,
  isSuccess: false,
};



export const submitComment = createAction('COACH_COMMENT_SUBMIT');

export const commentPending = createAction('COACH_COMMENT_SUBMIT_PENDING');
export const commentSuccessful = createAction('COACH_COMMENT_SUBMIT_SUCCESSFUL');
export const commentFailed = createAction('COACH_COMMENT_SUBMIT_FAILED');


export default handleActions({
  [commentPending]: state => ({ ...state, isPending: true}),
  [commentSuccessful]: state => ({ ...state, isPending: false, isSuccess: true}),
  [commentFailed]: state => ({ ...state, isPending: false, isSuccess: false}),
}, initialRequestState);