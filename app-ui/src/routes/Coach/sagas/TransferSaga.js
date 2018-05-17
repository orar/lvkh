// @flow
import {combineSagas} from "../../../util/Saga";
import { actions } from 'react-redux-form';
import TransferAPI from "../api/TransferAPI";
import { call, put, take, all } from 'redux-saga/effects';
import {makeTransfer, requestPending, requestSuccessful, requestFailed} from "../modules/Transfer/TransferModule";
import { fetchPlayerList, savePlayerList } from "../modules/PlayerList/PlayerListModule";
import { saveBenchPlayers } from "../modules/Team/BenchModule";
import { getPlayerDetail, savePlayerDetail } from "../modules/PlayerList/PlayerDetailModule";
import { message, notification } from 'antd';


export function* getPlayerDetailWorker(api: TransferAPI): Generator<*, *, *> {
  while(true) {
    const { payload } = yield take(getPlayerDetail().type);
    try {
      const response = yield call([api, api.getPlayerDetail], payload);
      console.log(payload);
      console.log(response);
      yield put(savePlayerDetail(response.details));
    } catch(e){
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


/**
 * A successful transfer updates bench players [coach.team.bench]
 *   and playerList players [coach.transfer.player]
 * @param api
 */
export function* makeTransferWorker(api: TransferAPI): Generator<*, *, *> {
  while(true) {
    const { payload } = yield take(makeTransfer().type);
    try {
      yield put(requestPending());
      const response = yield call([api, api.transferPlayer], payload);
      //update bench list
      yield put(saveBenchPlayers(response.details.bench));
      //update player list
      yield put(savePlayerList((response.details || response.results).players));
      yield put(requestSuccessful());
    } catch(e){
      yield put(requestFailed());
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

export function* transferSaga(api: TransferAPI): Generator<*, *, *> {
  yield all(combineSagas([
    [makeTransferWorker, api],
    [getPlayerDetailWorker, api]
  ]))
}

const api = new TransferAPI();
export default [transferSaga, api];