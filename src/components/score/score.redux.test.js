import {
  ACTION_TYPES,
  answeredQuestion,
  resetScore,
  selectQuestionsAnswered,
  selectCorrectlyAnswered,
  TEST_INTERNALS,
} from './score.redux';

const {
  INITIAL_STATE,
  resetScoreState,
  recordAnswer,
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

    describe('answeredQuestion', () => {
      it('creates a correct answer action', () => {
        expect(answeredQuestion(true))
        .toEqual({
          type: ACTION_TYPES.ANSWERED_QUESTION,
          payload: { answerWasCorrect: true }
        });
      });

      it('creates an incorrect answer action', () => {
        expect(answeredQuestion(false))
        .toEqual({
          type: ACTION_TYPES.ANSWERED_QUESTION,
          payload: { answerWasCorrect: false }
        });
      });
    });
  });

  describe('reducers', () => {
    const mockScoreState = {
      questionsAnswered: 7,
      correctlyAnswered: 3,
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

    describe('recordAnswer', () => {
      it('captures a correct answer correctly', () => {
        expect(recordAnswer(mockScoreState, answeredQuestion(true)))
        .toEqual({
          questionsAnswered: mockScoreState.questionsAnswered + 1,
          correctlyAnswered: mockScoreState.correctlyAnswered + 1,
        });
      });

      it('captures an incorrect answer correctly', () => {
        expect(recordAnswer(mockScoreState, answeredQuestion(false)))
        .toEqual({
          questionsAnswered: mockScoreState.questionsAnswered + 1,
          correctlyAnswered: mockScoreState.correctlyAnswered,
        });
      });

      it('ignores other actions', () => {
        expect(recordAnswer(mockScoreState, { type: 'SOME_RANDOM_TYPE' }))
        .toEqual(mockScoreState);
      });
    });
  });
  describe('selectors', () => {
    const mockState = {
      score: {
        questionsAnswered: 7,
        correctlyAnswered: 3,
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
