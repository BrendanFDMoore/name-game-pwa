import R from 'ramda';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { PROFILES } from '../config/people';
import { questionsReady } from '../components/game/game.redux'

const INITIALIZE = 'SAGAS/INITIALIZE';
export const createInitializeAction = () => ({ type: INITIALIZE });

/***************** WATCHERS ********************/
export function* watchInitialize() {
  yield takeLatest(INITIALIZE, initialize);
}

function* initialize(action) {
  yield call(randomizeProfiles);
}

function* randomizeProfiles() {
  const questions = PROFILES.map(
    p => R.assoc('rng', Math.random(), p)
  )
  .sort((a, b) => a.rng > b.rng)
  .map(p => {
    const newProfile = {
      name: p.name,
      group: p.group,
      image: p.images[Math.floor(Math.random() * p.images.length)],
    };
    console.log(newProfile);
    return newProfile;
  });

  const answers = questions.map(
    (q, index) => {
      const answersList = [{ text: q.name, correct: true}];
      questions
      .filter((a, idx) => idx !== index)
      .map(
        p => R.assoc('rng', Math.random(), p)
      )
      .sort((a, b) => a.rng > b.rng)
      .filter((a, idx) => idx <= 2)
      .map(c => answersList.push({ text: c.name, correct: false}));

      const shuffledAnswers = answersList
      .map(
        p => R.assoc('rng', Math.random(), p)
      )
      .sort((a, b) => a.rng > b.rng)
      return shuffledAnswers;
    }
  );

  yield put(questionsReady(questions, answers));
}
