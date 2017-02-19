import {
  ACTION_TYPES,
  questionsReady,
  answeredQuestion,
  clickedPlay,
  begin,
  end,
  reset,
  selectHasAnsweredCurrentQuestion,
  selectNumberOfQuestions,
  selectCurrentQuestionIndex,
  selectCurrentQuestion,
  selectCurrentAnswers,
  selectHasPlayed,
} from './game.redux';

describe('Game redux suite', () => {
  describe('action creators', () => {
    describe('restart', () => {
      it('creates a game reset action', () => {
        expect(reset())
        .toEqual({
          type: ACTION_TYPES.RESET,
        });
      });
    });

    describe('clickedPlay', () => {
      it('creates a clicked play action', () => {
        expect(clickedPlay())
        .toEqual({
          type: ACTION_TYPES.CLICKED_PLAY,
        });
      });
    });

    describe('begin', () => {
      it('creates a game begin action', () => {
        expect(begin())
        .toEqual({
          type: ACTION_TYPES.BEGIN,
        });
      });
    });

    describe('end', () => {
      it('creates a game end action', () => {
        expect(end())
        .toEqual({
          type: ACTION_TYPES.END,
        });
      });
    });

    describe('questionsReady', () => {
      it('creates a questions ready action', () => {
        expect(questionsReady([1, 2], ['a', 'b']))
        .toEqual({
          type: ACTION_TYPES.QUESTIONS_READY,
          payload: { questions: [1, 2], answers: ['a', 'b'] }
        });
      });
    });

    describe('answeredQuestion', () => {
      it('creates a correct answer action', () => {
        expect(answeredQuestion(true))
        .toEqual({
          type: ACTION_TYPES.ANSWERED_QUESTION,
          payload: { isCorrect: true }
        });
      });

      it('creates an incorrect answer action', () => {
        expect(answeredQuestion(false))
        .toEqual({
          type: ACTION_TYPES.ANSWERED_QUESTION,
          payload: { isCorrect: false }
        });
      });
    });
  });

  describe('selectors', () => {
    const mockState = {
      game: {
        questions: [
          { text: 'A' },
          { text: 'B' },
          { text: 'C' },
          { text: 'D' },
        ],
        answers: [
          [{text: 'A'}, {text: 'B'}, {text: 'C'}, {text: 'D'}],
          [{text: 'B'}, {text: 'C'}, {text: 'D'}, {text: 'A'}],
          [{text: 'C'}, {text: 'D'}, {text: 'A'}, {text: 'B'}],
          [{text: 'D'}, {text: 'A'}, {text: 'B'}, {text: 'C'}],
        ],
        currentQuestion: 2,
        hasAnsweredCurrentQuestion: true,
        isPlaying: true,
        playCount: 3,
      },
    };

    describe('selectHasAnsweredCurrentQuestion', () => {
      it('returns the correct default value', () => {
        expect(selectHasAnsweredCurrentQuestion(null))
        .toEqual(false);
      });
      it('returns the correct value', () => {
        expect(selectHasAnsweredCurrentQuestion(mockState))
        .toEqual(true);
      });
    });

    describe('selectNumberOfQuestions', () => {
      it('returns the correct default value', () => {
        expect(selectNumberOfQuestions(null))
        .toEqual(0);
      });
      it('returns the correct value', () => {
        expect(selectNumberOfQuestions(mockState))
        .toEqual(4);
      });
    });

    describe('selectCurrentQuestionIndex', () => {
      it('returns the correct default value', () => {
        expect(selectCurrentQuestionIndex(null))
        .toEqual(0);
      });
      it('returns the correct value', () => {
        expect(selectCurrentQuestionIndex(mockState))
        .toEqual(2);
      });
    });

    describe('selectCurrentQuestion', () => {
      it('returns the correct default value', () => {
        expect(selectCurrentQuestion(null))
        .toEqual(undefined);
      });
      it('returns the correct value', () => {
        expect(selectCurrentQuestion(mockState))
        .toEqual({ text: 'C' });
      });
    });
    
    describe('selectCurrentAnswers', () => {
      it('returns the correct default value', () => {
        expect(selectCurrentAnswers(null))
        .toEqual(undefined);
      });
      it('returns the correct value', () => {
        expect(selectCurrentAnswers(mockState))
        .toEqual([{text: 'C'}, {text: 'D'}, {text: 'A'}, {text: 'B'}]);
      });
    });

    describe('selectHasPlayed', () => {
      it('returns the correct default value', () => {
        expect(selectHasPlayed(null))
        .toEqual(false);
      });
      it('returns the correct value', () => {
        expect(selectHasPlayed(mockState))
        .toEqual(true);
      });
    });
  });
});
