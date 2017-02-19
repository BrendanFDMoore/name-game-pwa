import R from 'ramda';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { PROFILES } from '../config/people';
import { questionsReady } from '../components/game/game.redux'

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
