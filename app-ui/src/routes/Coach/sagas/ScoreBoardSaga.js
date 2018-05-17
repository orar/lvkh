// @flow
import { combineSagas } from "../../../util/Saga";
import { call, take, put, all } from 'redux-saga/effects';
import ScoreBoardAPI from '../api/ScoreBoardAPI';
import Alert from 'react-s-alert';
import { message, notification } from 'antd';
import { fetchScores, fetchRoundScore, saveRoundScores, saveScoreChart } from "../modules/Scoreboard/ScoreBoardModule";
import { fetchRoundScoreDetail, saveRoundScoreDetail} from "../modules/Scoreboard/RoundScoreDetailModule";
import { fetchSeasonScoreChart, saveSeasonScoreChart } from "../modules/Scoreboard/SeasonScoreChartModule";

/**
 *
 * Fetches score stats from backend
 * save to redux
 *
 * @deprecated
 * @param api
 */
export function* fetchScoreStatSaga(api: ScoreBoardAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fetchScores().type);
    try {
      const response = yield call([api, api.fetchScoreChart], payload);
      yield put(saveScoreChart(response.details));
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


/**
 * Fetches round score stats from backend
 * save to redux
 *
 * @param api
 */
export function* fetchRoundScoreStatSaga(api: ScoreBoardAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fetchRoundScore().type);
    try {
      const response = yield call([api, api.fetchRoundScore], payload);
      yield put(saveRoundScores(response.details));
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


/**
 * Fetches round score details from backend
 * save to redux
 *
 * @param api
 */
export function* fetchRoundScoreDetailSaga(api: ScoreBoardAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fetchRoundScoreDetail().type);
    try {
      const response = yield call([api, api.fetchRoundScoreDetail], payload);
      yield put(saveRoundScoreDetail(response.details));
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


/**
 *
 * Fetches season score chart from backend
 * save to redux
 *
 * @param api
 */
export function* fetchSeasonScoreChartSaga(api: ScoreBoardAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fetchSeasonScoreChart().type);
    try {
      const response = yield call([api, api.fetchSeasonScoreChart], payload);
      console.log(payload);
      console.log(response);
      yield put(saveSeasonScoreChart(response.details));
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



//combine sagas
export function* scoreBoardSaga(api: ScoreBoardAPI): Generator<*, *, *> {
  yield all(combineSagas([
    [fetchScoreStatSaga, api],
    [fetchRoundScoreStatSaga, api],
    [fetchRoundScoreDetailSaga, api],
    [fetchSeasonScoreChartSaga, api]
  ]));
}

const api = new ScoreBoardAPI();
export default [scoreBoardSaga, api];