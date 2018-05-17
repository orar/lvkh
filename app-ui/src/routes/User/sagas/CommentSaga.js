// @flow
import { combineSagas } from "../../../util/Saga";
import Alert from 'react-s-alert';
import { call, put, take, all } from 'redux-saga/effects';
import { saveComments, fetchComments } from "../modules/Comment/CommentDataModule";
import { submitComment } from "../modules/Comment/CommentFormModule";
import  CommentAPI from '../../Coach/api/CommentAPI';
import {message, notification} from 'antd';

/**
 * Fetches list of comments for a particular teamID and roundID and save to redux
 * payload: {teamID: [string], roundID: [string] }
 * @param api
 */
export function* fetchCommentWorker(api: CommentAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fetchComments().type);
    try {
      const response = yield call([api, api.fetchComments], payload);
      console.log('FetchCommentWorker Saga');
      console.log(payload);
      console.log(response);
      yield put(saveComments(response.details));
    } catch (e) {
      if (e.response) {
        const msg = {
          message: 'Unsuccessful',
          description: e.response.description
        };
        yield call(notification.open, msg);
      }
    }
  }
}

export function* saveCommentWorker(api: CommentAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(submitComment().type);
    try {
      const response = yield call([api, api.submitComment], payload);
      yield put(saveComments(response.details));
    } catch (e) {
      if (e.response) {
        const msg = {
          message: 'Unsuccessful',
          description: e.response.description
        };
        yield call(notification.open, msg);
      }
    }
  }
}


export function* commentSaga(api: CommentAPI): Generator<*, *, *>  {
  yield all(combineSagas([
    [fetchCommentWorker, api],
    [saveCommentWorker, api]
  ]));
}

const api = new CommentAPI();
export default [commentSaga, api];