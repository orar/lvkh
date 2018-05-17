// @flow

import Alert from 'react-s-alert';
import { call, put, take } from 'redux-saga/effects';
import { fetchGames, saveGames } from "../modules/Game/GameModule";
import {
  createTeam,
  createTeamRequestFailed,
  createTeamRequestSuccessful,
  createTeamRequestPending,
  resetTeamRequest
} from '../modules/Game/CreateTeamFormModule';
import {
  requestPrivilege,
  savePrivilegeResponse,
  privilegeRequestPending,
  privilegeRequestFailed,
  privilegeRequestSuccessful,
  resetPrivilegeRequest
} from '../modules/Game/GamePrivilegeModule';
import { saveTeams } from "../modules/Coach/CoachModule";
import  GameAPI from '../api/GameAPI';

import { message, notification } from 'antd';

/**
 * Fetches list of games from backend
 * save to redux
 *
 * @param api
 */
export function* gameSaga(api: GameAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fetchGames().type);
    try {
      const response = yield call([api, api.fetchGames], payload);

      yield put(saveGames(response.details));
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



/**
 * Request privilege for user to join game
 * save to redux
 *
 * @param api
 */
export function* requestPrivilegeWorker(api: GameAPI): Generator<*, *, *> {
  while(true){
    const { payload } = yield take(requestPrivilege().type);
    yield put(privilegeRequestPending());
    try {
      const response = yield call([api, api.requestPrivilege], payload);
      yield put(privilegeRequestSuccessful());
      yield put(savePrivilegeResponse(response.details));
    } catch (e) {
      yield put(privilegeRequestFailed());
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


export function* createTeamWorker(api: GameAPI): Generator<*, *, *> {
  while(true){
    const { payload } = yield take(createTeam().type);
    yield put(createTeamRequestPending());
    try {
      const response = yield call([api, api.createTeam], payload);
      yield put(createTeamRequestSuccessful());
      yield put(saveTeams(response.details));
      //TODO: navigate to coach: select username from redux.state.auth.data to append config.route.coach.appRaw
    } catch (e) {
      yield put(createTeamRequestFailed());
      if (e.response) {
        const msg = {
          message: 'Unsuccessful',
          description: e.response.description
        };
        yield call(notification.open, msg);
      }
    } finally {
      yield put(resetTeamRequest());
    }
  }
}

const api = new GameAPI();
export default [gameSaga, api];