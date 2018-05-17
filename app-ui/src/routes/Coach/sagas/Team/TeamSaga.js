// @flow
import  { combineSagas } from "../../../../util/Saga";
import { call, put, take, all } from 'redux-saga/effects';
import TeamAPI from "../../api/TeamAPI";
import Alert from 'react-s-alert';
import { actions } from 'react-redux-form';
import { createTeam, resetTeamName, createTeamRequestFailed, createTeamRequestPending, createTeamRequestSuccessful } from "../../modules/Game/CreateTeamFormModule";
import {fetchTeam, saveTeam, saveTeams } from "../../modules/Coach/CoachModule";
import { updateTeam, updateTeamRequestFailed, updateTeamRequestPending, updateTeamRequestSuccessful } from "../../modules/Team/UpdateTeamFormModule";
import { message, notification } from 'antd';


export function* updateTeamWorker(api: TeamAPI): Generator<*, *, *> {
  while(true){
    const { payload } = yield take(updateTeam().type);
    yield put(updateTeamRequestPending());
    try {
      const response = yield call([api, api.updateTeam], payload);
      yield put(saveTeam(response.details));
      yield put(updateTeamRequestSuccessful());
    } catch (e) {
      yield put(updateTeamRequestFailed());
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


export function* fetchTeamWorker(api: TeamAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fetchTeam().type);
    try {
      const response = yield call([api, api.fetchTeam], payload);
      console.log(payload);
      console.log(response);
      yield put(saveTeams(response.details));
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

export function* teamSaga(api: TeamAPI): Generator<*, *, *> {
  yield combineSagas([

    [updateTeamWorker, api],
    [fetchTeamWorker, api]
  ]);
}

const api = new TeamAPI();
export default [teamSaga, api];