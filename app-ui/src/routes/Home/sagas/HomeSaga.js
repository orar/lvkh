// @flow
import { all } from 'redux-saga/effects';
import { combineSagas } from "../../../util/Saga";
import slideSaga from './SlideSaga'
import supportSaga from './SupportSaga';
import fixtureSaga from './FixtureSaga';


export default function* UserSaga (): Generator<*, *, *> {
  yield all(combineSagas([
    slideSaga,
    supportSaga,
    fixtureSaga,
  ]))
}