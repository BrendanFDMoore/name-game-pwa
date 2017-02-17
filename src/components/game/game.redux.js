import { pathOr } from 'ramda';
import reducerPipe from 'reducer-pipe';
import { createSelector } from 'reselect';

// ACTION TYPES
const RESET = 'GAME/RESET';
const QUESTIONS_READY = 'GAME/QUESTIONS_READY';
const NEXT_QUESTION = 'GAME/NEXT_QUESTION';
const BEGIN = 'GAME/BEGIN';
const END = 'GAME/FINISH';
export const ACTION_TYPES = {
  BEGIN,
  NEXT_QUESTION,
  END,
  QUESTIONS_READY,
  RESET,
};

// ACTION CREATORS
export const questionsReady = (questions, answers) => {
  return {
    type: QUESTIONS_READY,
    payload: { 
      questions,
      answers,
    }
  }
};

export const begin = () => {
  return {
    type: BEGIN,
  }
};

export const nextQuestion = () => {
  return {
    type: NEXT_QUESTION,
  }
};

export const end = () => {
  return {
    type: END,
  }
};

export const reset = () => {
  return {
    type: RESET,
  }
};

// INITIAL STATE
const INITIAL_STATE = {
  questions: [],
  answers: [],
  currentQuestion: null,
  hasAnsweredCurrentQuestion: false,
  hasPlayed: false,
  isPlaying: false,
  playCount: 0,
};

// REDUCERS
const resetReducer = (state = INITIAL_STATE, action) => {
  if (action.type === RESET) {
    return INITIAL_STATE;
  }
  return state;
};

const beginReducer = (state = INITIAL_STATE, action) => {
  if (action.type === BEGIN) {
    return Object.assign({}, state, {
      currentQuestion: 0,
      hasAnsweredCurrentQuestion: false,
      isPlaying: true,
      hasPlayed: true,
      playCount: state.playCount + 1,
    });
  }

  return state;
};

const endReducer = (state = INITIAL_STATE, action) => {
  if (action.type === END) {
    const answerWasCorrect = pathOr(false, ['payload', 'answerWasCorrect'], action);
    return Object.assign({}, state, {
      questionsAnswered: state.questionsAnswered + 1,
      correctlyAnswered: state.correctlyAnswered + (1 * answerWasCorrect),
    });
  }

  return state;
};

const nextQuestionReducer = (state = INITIAL_STATE, action) => {
  if (action.type === NEXT_QUESTION) {
    return Object.assign({}, state, {
      currentQuestion: state.currentQuestion + 1,
      hasAnsweredCurrentQuestion: false,
    });
  }

  return state;
};

const questionsReadyReducer = (state = INITIAL_STATE, action) => {
  if (action.type === QUESTIONS_READY) {
    const { questions, answers } = action.payload;
    return Object.assign({}, state, {
      questions: questions,
      answers: answers,
    });
  }

  return state;
};

// COMBINED REDUCER
const gameReducer = reducerPipe([
  resetReducer,
  beginReducer,
  endReducer,
  nextQuestionReducer,
  questionsReadyReducer,
]);

// SELECTORS
const selectCurrentQuestionIndex = pathOr(0, ['game', 'currentQuestion']);
const selectQuestions = pathOr([], ['game', 'questions']);
const selectAnswers = pathOr([], ['game', 'answers']);

export const selectQuestionNumber = createSelector(
  selectCurrentQuestionIndex,
  index => index + 1
);

export const selectNumberOfQuestions = createSelector(
  selectQuestions,
  questions => questions && questions.length
);

export const selectCurrentQuestion = createSelector(
  selectCurrentQuestionIndex,
  selectQuestions,
  (index, questions) => questions[index]
);

export const selectCurrentAnswers = createSelector(
  selectCurrentQuestionIndex,
  selectAnswers,
  (index, answers) => answers[index]
);


// This export exists to expose otherwise non-exported objects for testing
// as a substitute for `rewire` which threw an error I could not resolve.
// I decided this was better than blindly export everything.
export const TEST_INTERNALS = {
  INITIAL_STATE,
  resetReducer,
  beginReducer,
  endReducer,
  nextQuestionReducer,
  questionsReadyReducer
};

export default gameReducer;
