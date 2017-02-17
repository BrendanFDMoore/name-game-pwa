import {
  ACTION_TYPES,
  questionsReady,
  begin,
  end,
  reset,
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
  });
});
