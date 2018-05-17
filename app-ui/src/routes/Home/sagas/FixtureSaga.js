// @flow
import { call, put, take } from 'redux-saga/effects';
import { fetchFixtures, saveFixtures } from "../modules/Fixture/FixtureModule";
import { message } from 'antd';
import SlideAPI from '../apis/SlideAPI';

/**
 * Fetches list of budget for various seasons and save to redux `coach.budget.data`
 * @param api
 */
export function* fetchFixturesWorker(api: SlideAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fetchFixtures().type);
    try {
      const response = yield call([api, api.fetchSlides], payload);
      yield put(saveFixtures(response.details))
    } catch (e) {
      return;
    }
  }
}

const api = new SlideAPI();
export default [fetchFixturesWorker, api];