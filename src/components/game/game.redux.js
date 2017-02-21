import { pathOr } from 'ramda';
import reducerPipe from 'reducer-pipe';
import { createSelector } from 'reselect';

// ACTION TYPES
const CLICKED_PLAY = 'GAME/CLICKED_PLAY';
const RESET = 'GAME/RESET';
const QUESTIONS_READY = 'GAME/QUESTIONS_READY';
const ANSWERED_QUESTION = 'GAME/ANSWERED_QUESTION';
const NEXT_QUESTION = 'GAME/NEXT_QUESTION';
const BEGIN = 'GAME/BEGIN';
const END = 'GAME/FINISH';
export const ACTION_TYPES = {
  CLICKED_PLAY,
  BEGIN,
  NEXT_QUESTION,
  END,
  QUESTIONS_READY,
  ANSWERED_QUESTION,
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

export const answeredQuestion = (isCorrect) => {
  return {
    type: ANSWERED_QUESTION,
    payload: { 
      isCorrect,
    }
  }
};

export const clickedPlay = () => {
  return {
    type: CLICKED_PLAY,
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
      playCount: state.playCount + 1,
    });
  }

  return state;
};

const endReducer = (state = INITIAL_STATE, action) => {
  if (action.type === END) {
    const answerWasCorrect = pathOr(false, ['payload', 'answerWasCorrect'], action);
    return Object.assign({}, state, {
      isPlaying: false,
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

const answeredQuestionReducer = (state = INITIAL_STATE, action) => {
  if (action.type === ANSWERED_QUESTION) {
    return Object.assign({}, state, {
      hasAnsweredCurrentQuestion: true,
    });
  }

  return state;
};

// COMBINED REDUCER
const gameReducer = reducerPipe([
  resetReducer,
  questionsReadyReducer,
  beginReducer,
  answeredQuestionReducer,
  nextQuestionReducer,
  endReducer,
]);

// SELECTORS
export const selectCurrentQuestionIndex = pathOr(0, ['game', 'currentQuestion']);
const selectQuestions = pathOr([], ['game', 'questions']);
const selectAnswers = pathOr([], ['game', 'answers']);
export const selectHasAnsweredCurrentQuestion = pathOr(false, ['game', 'hasAnsweredCurrentQuestion']);
export const selectIsPlaying = pathOr(false, ['game', 'isPlaying']);
export const selectPlayCount = pathOr(0, ['game', 'playCount']);

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

export const selectHasPlayed = createSelector(
  selectPlayCount,
  playCount => playCount > 0
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
