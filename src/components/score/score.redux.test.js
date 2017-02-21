import {
  ACTION_TYPES,
  recordAnswer,
  resetScore,
  selectQuestionsAnswered,
  selectCorrectlyAnswered,
  TEST_INTERNALS,
} from './score.redux';

const {
  INITIAL_STATE,
  resetScoreState,
  recordAnswerReducer,
} = TEST_INTERNALS;

// TODO: Get `rewire` working - resolve "unable to find module" error
// and remove TEST_INTERNALS
// const redux = rewire('./score.redux.js')

describe('Score redux suite', () => {
  describe('action creators', () => {
    describe('resetScore', () => {
      it('creates a score reset action', () => {
        expect(resetScore())
        .toEqual({
          type: ACTION_TYPES.RESET,
        });
      });
    });

    describe('recordAnswer', () => {
      it('creates a correct answer action', () => {
        expect(recordAnswer(true))
        .toEqual({
          type: ACTION_TYPES.RECORD_ANSWER,
          payload: { answerWasCorrect: true }
        });
      });

      it('creates an incorrect answer action', () => {
        expect(recordAnswer(false))
        .toEqual({
          type: ACTION_TYPES.RECORD_ANSWER,
          payload: { answerWasCorrect: false }
        });
      });
    });
  });

  describe('reducers', () => {
    const mockScoreState = {
      answered: 7,
      correct: 3,
    };

    describe('resetScoreState', () => {
      it('resets from empty state', () => {
        expect(resetScoreState(null, resetScore()))
        .toEqual(INITIAL_STATE);
      });

      it('resets from non-empty state', () => {
        expect(resetScoreState(mockScoreState, resetScore()))
        .toEqual(INITIAL_STATE);
      });

      it('ignores other actions', () => {
        expect(resetScoreState(mockScoreState, { type: 'SOME_RANDOM_TYPE' }))
        .toEqual(mockScoreState);
      });
    });

    describe('recordAnswerReducer', () => {
      it('captures a correct answer correctly', () => {
        expect(recordAnswerReducer(mockScoreState, recordAnswer(true)))
        .toEqual({
          answered: mockScoreState.answered + 1,
          correct: mockScoreState.correct + 1,
        });
      });

      it('captures an incorrect answer correctly', () => {
        expect(recordAnswerReducer(mockScoreState, recordAnswer(false)))
        .toEqual({
          answered: mockScoreState.answered + 1,
          correct: mockScoreState.correct,
        });
      });

      it('ignores other actions', () => {
        expect(recordAnswerReducer(mockScoreState, { type: 'SOME_RANDOM_TYPE' }))
        .toEqual(mockScoreState);
      });
    });
  });
  describe('selectors', () => {
    const mockState = {
      score: {
        answered: 7,
        correct: 3,
      },
    };

    describe('selectQuestionsAnswered', () => {
      it('returns the correct default value', () => {
        expect(selectQuestionsAnswered(null))
        .toEqual(0);
      });
      it('returns the correct value', () => {
        expect(selectQuestionsAnswered(mockState))
        .toEqual(7);
      });
    });

    describe('selectCorrectlyAnswered', () => {
      it('returns the correct default value', () => {
        expect(selectCorrectlyAnswered(null))
        .toEqual(0);
      });
      it('returns the correct value', () => {
        expect(selectCorrectlyAnswered(mockState))
        .toEqual(3);
      });
    });
  });
});
