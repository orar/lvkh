// @flow
import { all } from 'redux-saga/effects';
import { combineSagas } from "../../../util/Saga";
import dealSaga from './DealSaga';
import teamFormationSaga from './Team/FormationSaga';
import teamBenchSaga from './Team/BenchSaga';
import teamSaga from './Team/TeamSaga';
import scoreboardSaga from './ScoreBoardSaga';
import transferSaga from './TransferSaga';
import countryListSaga from './CountryListSaga';
import playerListSaga from './PlayerListSaga';
import gameSaga from './GameSaga';

export default function* CoachSaga(): Generator<*, *, *> {
  yield all(combineSagas([
    dealSaga,
    teamBenchSaga,
    teamFormationSaga,
    teamSaga,
    scoreboardSaga,
    transferSaga,
    countryListSaga,
    playerListSaga,
    gameSaga,
  ]));
}