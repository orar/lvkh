// @flow

import Alert from 'react-s-alert';
import { call, put, take } from 'redux-saga/effects';
import { getTeamDeals, saveTeamDeals } from "../modules/Deal/DealModule";
import  DealAPI from '../api/DealAPI';
import { message } from 'antd';

/**
 *
 * Fetches list of budget for various seasons and save to redux `coach.budget.data`
 *
 * @deprecated
 * @param api
 */
export function* getDealWorker(api: DealAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(getTeamDeals().type);
    try {
      const response = yield call([api, api.fetchDeals], payload);
      yield put(saveTeamDeals(response.details))
    } catch (e) {
      if(!e.response){
        yield call(message.error, 'Connection failed!');
        return;
      }
    }
  }
}

const api = new DealAPI();
export default [getDealWorker, api];