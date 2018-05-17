// @flow
import { all } from 'redux-saga/effects';
import { combineSagas } from "../../../util/Saga";
import profileSaga  from './ProfileSaga';
import accountSaga from './AccountSaga';
import commentSaga from './CommentSaga';
import promoSaga from './PromoSaga';
import settingsSaga from './SettingsSaga';

export default function* UserSaga (): Generator<*, *, *> {
  yield all(combineSagas([
    profileSaga,
    commentSaga,
    accountSaga,
    promoSaga,
    settingsSaga,
  ]))
}