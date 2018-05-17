// @flow
import { combineReducers } from 'redux';
import commentReducer from './CommentDataModule';
import commentFormReducer from './CommentFormModule';


export default combineReducers({
  comment: commentReducer,
  commentForm: commentFormReducer,
});