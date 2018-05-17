// @flow
import React from 'react';
import { call, put, take, all } from 'redux-saga/effects';
import { combineSagas } from "../../../util/Saga";
import {message, notification } from 'antd';
import { Icon as FaIcon } from 'react-fa';
import theme from '../../../util/Theme';
import { saveAccount } from "../modules/Account/AccountModule";
import { verifyPromoCode, requestPending, requestSuccessful, requestFailed, getPromoData, savePromoData } from "../modules/Promo/PromoCodeFormModule";
import PromoAPI from '../api/PromoAPI';

/**
 * Fetches list of comments for a particular teamID and roundID and save to redux
 * payload: {teamID: [string], roundID: [string] }
 * @param api
 */
export function* verifyPromoWorker(api: PromoAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(verifyPromoCode().type);
    try {
      yield put(requestPending());
      const response = yield call([api, api.verifyPromoCode], payload);
      yield put(requestSuccessful());
      console.log('Fetch Account Worker Saga');
      console.log(payload);
      console.log(response);
      yield put(saveAccount(response.details));
    } catch (e) {
      yield put(requestFailed());
      if(!e.response){
        yield call(message.error, 'Connection failed!');
      } else {
        const msg = {
          message: 'Unsuccessful',
          icon: <FaIcon name="frown-o" style={{color: theme.redDark}} />,
          description: e.response.description
        };
        yield call(notification.open, msg );
      }
    }
  }
}


export function* getPromoDataWorker(api: PromoAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(getPromoData().type);
    try {
      const response = yield call([api, api.getPromoData]);
      console.log('Fetch Account Worker Saga');
      console.log(payload);
      console.log(response);
      yield put(savePromoData(response.details));
    } catch (e) {
      if(!e.response){
        yield call(message.error, 'Connection failed!');
      } else {
        yield call(message.error, e.response.description);
      }
    }
  }
}

export function* promoSaga(api: PromoAPI): Generator<*, *, *> {
  yield all( combineSagas([
    [getPromoDataWorker, api],
    [verifyPromoWorker, api]
  ]));
}

const api = new PromoAPI();
export default [promoSaga, api]