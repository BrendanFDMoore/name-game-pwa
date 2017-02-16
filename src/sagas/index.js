import R from 'ramda'
import { fork } from 'redux-saga/effects';
import * as startupSagas from './startup';

export const INITIALIZE = startupSagas.createInitializeAction();

const forkAllSagas = R.pipe(R.map(R.values), R.unnest, R.map(fork));

function* rootSaga() {
  yield forkAllSagas([
    startupSagas,
  ]);
}

export default rootSaga;