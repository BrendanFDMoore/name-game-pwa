import R from 'ramda';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { PROFILES } from '../config/people';

const INITIALIZE = 'SAGAS/INITIALIZE';
export const createInitializeAction = () => ({ type: INITIALIZE });

/***************** WATCHERS ********************/
export function* watchInitialize() {
  yield takeLatest(INITIALIZE, initialize);
}

function* initialize(action) {
  yield put({type: 'initialized_ok'})
}
