import R from 'ramda';
import reducerPipe from 'reducer-pipe';
import { createSelector } from 'reselect';

// ACTION TYPES
const CLICKED_PLAY = 'GAME/CLICKED_PLAY';
const RESET = 'GAME/RESET';
const QUESTIONS_READY = 'GAME/QUESTIONS_READY';
const ANSWERED_QUESTION = 'GAME/ANSWERED_QUESTION';
const NEXT_QUESTION = 'GAME/NEXT_QUESTION';
const BEGIN = 'GAME/BEGIN';
const END = 'GAME/END';
const TOGGLE_SHOW_INCORRECT = 'GAME/TOGGLE_SHOW_INCORRECT';
const TOGGLE_HARD_MODE = 'GAME/TOGGLE_HARD_MODE';
export const ACTION_TYPES = {
  CLICKED_PLAY,
  BEGIN,
  NEXT_QUESTION,
  END,
  QUESTIONS_READY,
  ANSWERED_QUESTION,
  RESET,
  TOGGLE_SHOW_INCORRECT,
  TOGGLE_HARD_MODE,
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

export const toggleShowIncorrect = () => {
  return {
    type: TOGGLE_SHOW_INCORRECT,
  }
};

export const toggleHardMode = () => {
  return {
    type: TOGGLE_HARD_MODE,
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
  incorrectToReview: [],
  showIncorrect: false,
  isHardMode: false,
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
      incorrectToReview: [],
      showIncorrect: false,
    });
  }

  return state;
};

const endReducer = (state = INITIAL_STATE, action) => {
  if (action.type === END) {
    return Object.assign({}, state, {
      isPlaying: false,
    });
  }

  return state;
};

const toggleShowIncorrectReducer = (state = INITIAL_STATE, action) => {
  if (action.type === TOGGLE_SHOW_INCORRECT) {
    return Object.assign({}, state, {
      showIncorrect: !(state.showIncorrect === true),
    });
  }

  return state;
};

const toggleHardModeReducer = (state = INITIAL_STATE, action) => {
  if (action.type === TOGGLE_HARD_MODE) {
    return Object.assign({}, state, {
      isHardMode: !(state.isHardMode === true),
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

// Build up an accumulation of profiles the player needs to review more
const incorrectAnswerReducer = (state = INITIAL_STATE, action) => {
  if (action.type === ANSWERED_QUESTION) {
    console.log('incorrectAnswerReducer');
    const { payload: { isCorrect } } = action;
    if (!isCorrect) {
      return Object.assign({}, state, {
        incorrectToReview: [
          state.questions[state.currentQuestion],
          ...state.incorrectToReview,
        ],
      });
    }
    return state;
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
  incorrectAnswerReducer,
  toggleShowIncorrectReducer,
  toggleHardModeReducer,
]);

// SELECTORS
export const selectCurrentQuestionIndex = R.pathOr(0, ['game', 'currentQuestion']);
const selectQuestions = R.pathOr([], ['game', 'questions']);
const selectAnswers = R.pathOr([], ['game', 'answers']);
export const selectHasAnsweredCurrentQuestion = R.pathOr(false, ['game', 'hasAnsweredCurrentQuestion']);
export const selectIsPlaying = R.pathOr(false, ['game', 'isPlaying']);
export const selectIsHardMode = R.pathOr(false, ['game', 'isHardMode']);
export const selectPlayCount = R.pathOr(0, ['game', 'playCount']);
export const selectIncorrectToReview = R.pathOr([], ['game', 'incorrectToReview']);
export const selectShowIncorrect = R.pathOr(false, ['game', 'showIncorrect']);

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

export const selectAllNames = createSelector(
  selectQuestions,
  R.pluck('name')
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
