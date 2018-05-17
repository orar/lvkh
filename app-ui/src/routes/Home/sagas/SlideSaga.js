// @flow
import { call, put, take } from 'redux-saga/effects';
import { fetchSlides, saveSlides } from "../modules/Slide/SlideModule";
import { message, notification } from 'antd';
import SlideAPI from '../apis/SlideAPI';

/**
 * Fetches list of budget for various seasons and save to redux `coach.budget.data`
 * @param api
 */
export function* fetchSlidesWorker(api: SlideAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fetchSlides().type);
    try {
      const response = yield call([api, api.fetchSlides], payload);
      yield put(saveSlides(response.details))
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

const api = new SlideAPI();
export default [fetchSlidesWorker, api];