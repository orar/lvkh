// @flow
import { createAction, handleActions } from 'redux-actions';
import {noDupConcat} from "../../../../util/HelperUtil";
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';


type SubComment = {
  id: string,
  userID: string,
  avatarUrl: string,
  comment: string,
  date: number,
}

//SubComments should be nested in Parent Comment.
//Nesting level: 1
//TODO: Create a comment type and reducer functions
export type Comment = {
  id: string,
  userID: string,
  threadID: string,
  teamID: string,
  roundID: string,
  seasonID: string,
  user: string,
  username: string,
  userAvatar: string,
  comment: string,
  subComment: Array<SubComment>,
  edited: boolean,
  read: boolean,
  dateTime: number
};

export type CommentData = {
  [string]: {
    count: number,
    data: Array<Comment>
  }
}

export const initialCommentData: CommentData = {};


export const fetchComments = createAction('COACH_COMMENT_FETCH');

/**
 * SaveComment should have a payload structure of { teamID: string, count: number, comment: Array<Comment>}
 * Eg. { teamID: 'ef34da45aebc3fa39e0e3', count:  13, comment: [{ef34da45aebc3fa39e0e3,...},{}] }
 */
export const saveComments = createAction('COACH_COMMENT_SAVE');

/**
 * Removes comments &| subComments by ID from an array of comments saved in redux.
 * removeComments should have a payload structure of Array<{id: string, subCommentID?: string}>
 */
export const removeComments = createAction('COACH_COMMENT_REMOVE');
export const clearComments = createAction('COACH_COMMENT_CLEAR');


//payload: {threadID: '3e4efad3df3', count: comment, data: [] }
const formatSaveComment = (state = {}, payload) => {
  const { threadID, count, comment } = payload;
  let newComments = comment;
  if(threadID in state && 'data' in state[threadID]){
    newComments = noDupConcat(state[threadID].comment, comment, (s, p) => s.id === p.id);
      //.sort((a, b) => a.dateTime === b.dateTime ? 0 : (a.dateTime > b.dateTime) ? 1 : -1);
  }
  return { [threadID]: { count, data: newComments }}
};

export default handleActions({
  [saveComments]: (state, action) => ({ ...state, ...formatSaveComment(state[action.payload.threadID], action.payload )}), //payload: {teamID: '3e4efad3df3', count: comment, data: [] }
  [removeComments]: (state, action) => omit(state, action.payload.threadID),
  [clearComments]: () => initialCommentData,
}, initialCommentData);