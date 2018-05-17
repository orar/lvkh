// @flow
import React from 'react';
import Alert from 'react-s-alert';
import { call, put, take, all } from 'redux-saga/effects';
import { getAccount, saveAccount } from "../modules/Account/AccountModule";
import { requestPending, requestSuccessful, requestFailed} from "../modules/Account/RedeemModule";
import {message, notification } from 'antd';
import { Icon as FaIcon } from 'react-fa';
import theme from '../../../util/Theme';
import AccountAPI from '../api/AccountAPI';
import {combineSagas} from "../../../util/Saga";

/**
 * Fetches list of comments for a particular teamID and roundID and save to redux
 * payload: {teamID: [string], roundID: [string] }
 * @param api
 */
export function* getAccountWorker(api: AccountAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(getAccount().type);
    try {
      const response = yield call([api, api.getAccount]);
      console.log('Fetch Account Worker Saga');
      console.log(payload);
      console.log(response);
      yield put(saveAccount(response.details));
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

export function* redeemRewardWorker(api: AccountAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(getAccount().type);
    try {
      yield put(requestPending());
      const response = yield call([api, api.redeemReward]);
      console.log('Redeem Reward Worker Saga');
      console.log(payload);
      console.log(response);
      yield put(requestSuccessful());
      const msg = {
        message: 'Scheduled',
        icon: <FaIcon name="smile-o" style={{color: theme.greenNormal}} />,
        description: response.description
      };
      yield call(notification.open, msg );
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

export function* accountSaga(api: AccountAPI): Generator<*, *, *> {
  yield all(combineSagas([
    [redeemRewardWorker, api],
    [getAccountWorker, api],
  ]));
}

const api = new AccountAPI();
export default [accountSaga, api]