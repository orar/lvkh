// @flow
import { actions } from 'react-redux-form';
import PlayerListAPI from "../api/PlayerListAPI";
import { call, put, take, all } from 'redux-saga/effects';
import { fetchPlayerList, savePlayerList} from "../modules/PlayerList/PlayerListModule";
import { requestPending, requestComplete, roleExhausted } from "../modules/PlayerList/PlayerMetaModule";
import { message, notification } from 'antd';



/**
 * Fetches list of players from backend
 * save to redux
 *
 * @param api
 */
export function* fetchPlayerListSaga(api: PlayerListAPI): Generator<*, *, *> {
  while(true) {
    const { payload } = yield take(fetchPlayerList().type);
    yield put(requestPending());
    try {
      const response = yield call([api, api.fetchPlayers], payload);
      yield put(savePlayerList(response.details));
      yield put(requestComplete());
      //todo: yield put(roleExhausted(role))
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


const api = new PlayerListAPI();
export default [fetchPlayerListSaga, api];