import { call, takeLatest } from 'redux-saga/effects'

import { generateQuestions } from './game'

const INITIALIZE = 'SAGAS/INITIALIZE';
export const createInitializeAction = () => ({ type: INITIALIZE });

/***************** WATCHERS ********************/
export function* watchInitialize() {
  yield takeLatest(INITIALIZE, initialize);
}

function* initialize(action) {
  yield call(generateQuestions);
}
