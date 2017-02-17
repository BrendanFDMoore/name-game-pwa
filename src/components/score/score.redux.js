import { pathOr } from 'ramda';
import reducerPipe from 'reducer-pipe';

// ACTION TYPES
const ANSWERED_QUESTION = 'SCORE/ANSWERED_QUESTION';
const RESET = 'SCORE/RESET';
export const ACTION_TYPES = {
  ANSWERED_QUESTION,
  RESET,
};

// ACTION CREATORS
export const answeredQuestion = (answerWasCorrect) => {
  return {
    type: ANSWERED_QUESTION,
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
  questionsAnswered: 0,
  correctlyAnswered: 0
};

// REDUCERS
const resetScoreState = (state = INITIAL_STATE, action) => {
  if (action.type === RESET) {
    return INITIAL_STATE;
  }
  return state;
};

const recordAnswer = (state = INITIAL_STATE, action) => {
  if (action.type === ANSWERED_QUESTION) {
    const answerWasCorrect = pathOr(false, ['payload', 'answerWasCorrect'], action);
    return Object.assign({}, state, {
      questionsAnswered: state.questionsAnswered + 1,
      correctlyAnswered: state.correctlyAnswered + (1 * answerWasCorrect),
    });
  }

  return state;
};

// COMBINED REDUCER
const scoreReducer = reducerPipe([
  resetScoreState,
  recordAnswer,
]);

// SELECTORS
export const selectQuestionsAnswered = pathOr(0, ['score', 'questionsAnswered']);
export const selectCorrectlyAnswered = pathOr(0, ['score', 'correctlyAnswered']);

export default scoreReducer;

// This export exists to expose otherwise non-exported objects for testing
// as a substitute for `rewire` which threw an error I could not resolve.
// I decided this was better than blindly export everything.
export const TEST_INTERNALS = {
  INITIAL_STATE,
  resetScoreState,
  recordAnswer,
};