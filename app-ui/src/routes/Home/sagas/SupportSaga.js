// @flow
import React from 'react';
import { call, put, take, all } from 'redux-saga/effects';
import { sendSupport, requestFailed, requestSuccessful, requestPending } from "../modules/Support/SupportModule";
import { Icon as FaIcon } from 'react-fa';
import { notification, message } from 'antd';
import { browserHistory } from 'react-router';
import config from 'config/index'
import SupportAPI from '../apis/SupportAPI';
import theme from '../../../util/Theme';

export function* sendSupportWorker(api: SupportAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(sendSupport().type);
    try {
      yield put(requestPending());
      const response = yield call([api, api.sendSupport]);

      yield put(requestSuccessful());
      const msg = {
        message: 'Message Sent',
        icon: <FaIcon name="smile-o" style={{color: theme.greenNormal}} />,
        description: response.description
      };
      yield call(notification.open, msg );
      //yield call(browserHistory.push, config.routes.home.faq);
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


const api = new SupportAPI();
export default [sendSupportWorker, api];