// @flow
import Alert from 'react-s-alert';
import { browserHistory } from 'react-router';
import { actions } from 'react-redux-form';
import { call, put, take, all } from 'redux-saga/effects';
import { saveUser } from 'routes/Auth/modules/UserModule';
import { saveActivationEmail } from 'routes/Auth/modules/ActivateAccountModule';
import { modelPath,
  updateProfile,
  requestPending,
  requestSuccessful,
  requestFailed
} from "../modules/CoachProfileModule";
import AuthAPI from 'routes/Auth/apis/AuthAPI';
import config from 'config/index';

export function* coachProfileUpdateSaga(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(updateProfile().type);
    try {
      yield put(requestPending());
      const response = yield call([api, api.coachProfileUpdate], payload);
      yield put(requestSuccessful(response));
      yield put(saveUser(response.details));
      yield put(actions.reset(modelPath));
      yield call(browserHistory.push, config.route.index);
    } catch (e) {
      yield put(requestFailed());
      switch (e.response.code) {
        case 'coach.form.errors': {
          const details = e.response.details || [];
          yield all(details.map(detail => put(actions.setErrors(`${modelPath}.${detail.key}`, detail.message))));
          break;
        }

        default:
          yield call(Alert.error, e.response.description);
          break;
      }
    }
  }
}

const api = new AuthAPI();
export default [coachProfileUpdateSaga, api];
