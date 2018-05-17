// @flow

import { connect } from "react-redux";
import type {Dispatch} from 'redux';
import { fetchComments } from "../../modules/Comment/CommentDataModule";
import { submitComment } from "../../modules/Comment/CommentFormModule";
import Comment from '../../components/Comment/Comment';



const mapStateToProps = (state, props ) => ({
  ...state.user.comment.commentForm,
  ...state.user.comment.comment[props.threadID],
});



const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onFetchComment: data => dispatch(fetchComments(data)),
  onSubmitComment: data => dispatch(submitComment(data)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Comment);