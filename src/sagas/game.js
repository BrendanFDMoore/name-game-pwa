import R from 'ramda';
import { takeLatest, delay } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'

import { PROFILES } from '../config/people';
import {
  ACTION_TYPES as GAME_ACTIONS,
  begin as beginGame,
  questionsReady,
  nextQuestion,
  end as endGame,
  selectCurrentQuestionIndex,
  selectNumberOfQuestions,
} from '../components/game/game.redux'
import { resetScore, recordAnswer } from '../components/score/score.redux'

const INITIALIZE = 'SAGAS/INITIALIZE';
export const createInitializeAction = () => ({ type: INITIALIZE });

/***************** WATCHERS ********************/
export function* watchClickedPlay() {
  yield takeLatest(GAME_ACTIONS.CLICKED_PLAY, clickedPlay);
}

export function* watchQuestionAnswered() {
  yield takeLatest(GAME_ACTIONS.ANSWERED_QUESTION, processAnswer);
}

/***************** WORKERS ********************/
function* clickedPlay(action) {
  // reset the score
  yield put(resetScore())
  
  // set up the questions
  yield call(generateQuestions);

  // start the game
  yield put(beginGame())
}

export function* generateQuestions() {
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

function* processAnswer(action) {
  yield put(recordAnswer(action.payload.isCorrect));

  const currentQuestionIndex = yield select(selectCurrentQuestionIndex);
  const numberOfQuestions = yield select(selectNumberOfQuestions);
  
  // leave a short time for player to review revealed answer
  yield call(delay, 1000);

  // Are there any more questions to go to?
  if (currentQuestionIndex + 1 < numberOfQuestions) {
    // If yes, go to the next question
    yield put(nextQuestion());
  } else {
    // if not, end the game
    yield put(endGame());
  }
}