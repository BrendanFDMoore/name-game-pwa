import R from 'ramda'
import { fork } from 'redux-saga/effects';
import * as startupSagas from './startup';
import * as gameSagas from './game';

export const INITIALIZE = startupSagas.createInitializeAction();

const forkAllSagas = R.pipe(R.map(R.values), R.unnest, R.map(fork));

function* rootSaga() {
  yield forkAllSagas([
    startupSagas,
    gameSagas,
  ]);
}

export default rootSaga;