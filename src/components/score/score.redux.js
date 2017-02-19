import { pathOr } from 'ramda';
import reducerPipe from 'reducer-pipe';

// ACTION TYPES
const RECORD_ANSWER = 'SCORE/RECORD_ANSWER';
const RESET = 'SCORE/RESET';
export const ACTION_TYPES = {
  RECORD_ANSWER,
  RESET,
};

// ACTION CREATORS
export const recordAnswer = (answerWasCorrect) => {
  return {
    type: RECORD_ANSWER,
    payload: { 
      answerWasCorrect
    }
  }
};

export const resetScore = () => {
  return {
    type: RESET,
  }
};

// INITIAL STATE
const INITIAL_STATE = {
  answered: 0,
  correct: 0
};

// REDUCERS
const resetScoreState = (state = INITIAL_STATE, action) => {
  if (action.type === RESET) {
    return INITIAL_STATE;
  }
  return state;
};

const recordAnswerReducer = (state = INITIAL_STATE, action) => {
  if (action.type === RECORD_ANSWER) {
    const answerWasCorrect = pathOr(false, ['payload', 'answerWasCorrect'], action);
    return Object.assign({}, state, {
      answered: state.answered + 1,
      correct: state.correct + (1 * answerWasCorrect),
    });
  }

  return state;
};

// COMBINED REDUCER
const scoreReducer = reducerPipe([
  resetScoreState,
  recordAnswerReducer,
]);

// SELECTORS
export const selectQuestionsAnswered = pathOr(0, ['score', 'answered']);
export const selectCorrectlyAnswered = pathOr(0, ['score', 'correct']);

export default scoreReducer;

// This export exists to expose otherwise non-exported objects for testing
// as a substitute for `rewire` which threw an error I could not resolve.
// I decided this was better than blindly export everything.
export const TEST_INTERNALS = {
  INITIAL_STATE,
  resetScoreState,
  recordAnswerReducer,
};