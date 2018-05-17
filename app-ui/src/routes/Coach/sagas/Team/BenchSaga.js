// @flow
import React from 'react';
import { call, put, take, all } from 'redux-saga/effects';
import TeamAPI from "../../api/TeamAPI";
import { message, notification } from 'antd';
import { actions } from 'react-redux-form';
import { fillRoles, submitTeamRoles, fetchTeamRoles} from "../../modules/Team/RoleModule";
import { fetchBenchPlayers, saveBenchPlayers } from "../../modules/Team/BenchModule";
import {combineSagas} from "../../../../util/Saga";


/**
 * Fetches List of Bench players and team RoleMap for a particular team using teamID
 * @param api
 */
export function* fetchBenchPlayersWorker(api: TeamAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fetchBenchPlayers().type);
    try {
      const { details: { bench, roles }} = yield call([api, api.fetchBenchPlayers], payload);
      if(bench) {
        yield put(saveBenchPlayers(bench));
      }
      if(roles) {
        yield put(fillRoles(roles));
      }
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

export function* submitTeamRoleWorker(api: TeamAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(submitTeamRoles().type);
    try {
      const response = yield call([api, api.submitTeamRoles], payload);
      yield put(fillRoles(response.details));
      //yield call(message.success, response.description);
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

export function* benchSaga(api: TeamAPI): Generator<*, *, *> {
  yield all(combineSagas([
    [fetchBenchPlayersWorker, api],
    [submitTeamRoleWorker, api],
    ]));
}

const api = new TeamAPI();
export default [benchSaga, api];