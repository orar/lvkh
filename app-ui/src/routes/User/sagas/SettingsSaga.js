// @flow
import { call, take, put, all } from 'redux-saga/effects';
import { getSettings, updateSettings, saveSettings} from "../modules/Settings/SettingsModule";
import SettingsAPI from '../api/SettingsAPI';
import { message, notification } from 'antd';
import {combineSagas} from "../../../util/Saga";

export function* getSettingsWorker(api: SettingsAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(getSettings().type);
    try {
      const response = yield call([api, api.getSettings], payload);
      yield put(saveSettings(response.details));
    } catch (e) {
      if(!e.response){
        yield call(message.error, 'Connection failed!');
      }
    }
  }
}

export function* updateSettingsWorker(api: SettingsAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(updateSettings().type);
    try {
      const response = yield call([api, api.updateSettings], payload);
      yield put(saveSettings(response.details));
    } catch (e) {
      if(!e.response){
        yield call(message.error, 'Connection failed!');
      }
    }
  }
}


export function* settingsSaga(api: SettingsAPI): Generator<*, *, *> {
  yield all(combineSagas([
    [getSettingsWorker, api],
    [updateSettingsWorker, api]
  ]));
}

const api = new SettingsAPI();
export default [settingsSaga, api]
