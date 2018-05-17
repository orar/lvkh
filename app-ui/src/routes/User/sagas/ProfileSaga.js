// @flow
import { combineSagas } from "../../../util/Saga";
import Alert from 'react-s-alert';
import { call, put, take, all } from 'redux-saga/effects';
import { getProfile, saveProfile, getUserProfile, saveUserProfile } from "../modules/Profile/ProfileModule";
import { commitProfile } from "../modules/Profile/ProfileFormModule";
import {message, notification} from 'antd';
import ProfileAPI from '../api/ProfileAPI';
import { browserHistory } from 'react-router';

/**
 * Fetches list of comments for a particular teamID and roundID and save to redux
 * payload: {teamID: [string], roundID: [string] }
 * @param api
 */
export function* getProfileWorker(api: ProfileAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(getProfile().type);
    try {
      const response = yield call([api, api.getProfile], payload);
      console.log('FetchProfileWorker Saga');
      console.log(payload);
      console.log(response);
      yield put(saveProfile(response.details));
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


export function* getUserProfileWorker(api: ProfileAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(getUserProfile().type);
    try {
      const response = yield call([api, api.getUserProfile], payload);
      console.log('FetchProfileWorker Saga');
      console.log(payload);
      console.log(response);
      yield put(saveUserProfile(response.details));
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

export function* commitProfileWorker(api: ProfileAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(commitProfile().type);
    try {
      const response = yield call([api, api.commitProfile], payload);
      yield put(saveProfile(response.details));
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


export function* profileSaga(api: ProfileAPI): Generator<*, *, *>  {
  yield all(combineSagas([
    [getProfileWorker, api],
    [getUserProfileWorker, api],
    [commitProfileWorker, api],
  ]));
}

const api = new ProfileAPI();
export default [profileSaga, api];