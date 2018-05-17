// @flow

import Alert from 'react-s-alert';
import { call, put, take } from 'redux-saga/effects';
import { fetchCountries, saveCountries } from "../modules/CountryList/CountryListModule";
import CountryListAPI from '../api/CountryListAPI';
import { message, notification } from 'antd';

/**
 * Fetches countries from backend
 * @param api
 */
export function* fetchCountriesWorker(api: CountryListAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fetchCountries().type);
    try {
      const response = yield call([api, api.fetchCountries], payload);
      yield put(saveCountries(response.details))
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

const api = new CountryListAPI();
export default [fetchCountriesWorker, api];