// @flow
import {combineSagas} from "../../../../util/Saga";
import { call, put, take, all } from 'redux-saga/effects';
import TeamAPI from "../../api/TeamAPI";
import Alert from 'react-s-alert';
import { actions } from 'react-redux-form';
import { fetchFormation, saveFormation, changeFormation } from "../../modules/Team/FormationModule";
import { fillRoles } from "../../modules/Team/RoleModule";
import { notification } from 'antd';

export function* fetchFormationWorker(api: TeamAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fetchFormation().type);
    try {
      const response = yield call([api, api.fetchFormation], payload);
      yield put(saveFormation(response.details));
    } catch (e) {
      if(e.response){
        const msg = {
          message: 'Unsuccessful',
          description: e.response.description
        };
        yield call(notification.open, msg);
      }
    }
  }
}

export function* changeFormationWorker(api: TeamAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(changeFormation().type);
    try {
      const response = yield call([api, api.changeFormation], payload);
      //TODO whether a change formation should response update players to fit in role and invalidate role data
      yield put(saveFormation((response.details || response.results).formation));
      yield put(fillRoles((response.details || response.results).roles))
    } catch (e) {
      if(e.response){
        const msg = {
          message: 'Unsuccessful',
          description: e.response.description
        };
        yield call(notification.open, msg);
      }
    }
  }}


export function* formationSaga(api: TeamAPI): Generator<*, *, *> {
  yield combineSagas([
    [fetchFormationWorker, api],
    [changeFormationWorker, api],
  ])
}

const api = new TeamAPI();
export default [formationSaga, api];