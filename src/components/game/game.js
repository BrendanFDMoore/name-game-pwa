import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Question from '../question';
import Score from '../score';
import {
  answeredQuestion,
  clickedPlay,
  selectCurrentQuestion,
  selectCurrentAnswers,
  selectHasAnsweredCurrentQuestion,
  selectIsPlaying,
  selectHasPlayed,
} from './game.redux'
import {
  selectQuestionsAnswered,
  selectCorrectlyAnswered,
} from '../score/score.redux';

export class Game extends Component {
  render() {
    const {
      question,
      answers,
      answeredQuestion,
      hasAnsweredCurrentQuestion,
      isPlaying,
      hasPlayed,
      clickedPlay,
    } = this.props;
    const activeGame = (
      <div>
        <div>
          <Question question={question} hasAnswered={hasAnsweredCurrentQuestion} answers={answers} answerHandler={answeredQuestion} />
        </div>
        <div>
          <Score />
        </div>
      </div>
    );

    const playAgain = hasPlayed ? ' again' : '';
    const lastScore = (
      <div>
        <div>
          Previous Score:
        </div>
        <div>
          <Score />
        </div>
      </div>
    );
    const inactiveGame = (
      <div>
        {
          hasPlayed &&
          <div>
            {'Game Over'}
          </div>
        }
        <div>
          {`Ready to play${playAgain}?`}
        </div>
        <div>
          <input type='button' onClick={clickedPlay} value={`Play${playAgain}`} />
        </div>
        <div>
          { hasPlayed && lastScore }
        </div>
      </div>
    );
    return (
      <div className="Game">
        {isPlaying ? activeGame : inactiveGame }
      </div>
    );
  }
}

Game.PropTypes = {
  question: PropTypes.object,
  answers: PropTypes.array,
  answeredQuestion: PropTypes.func.isRequired,
  hasAnsweredCurrentQuestion: PropTypes.bool,
  isPlaying: PropTypes.bool,
  hasPlayed: PropTypes.bool,
  clickedPlay: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  return {
    question: selectCurrentQuestion(state),
    answers: selectCurrentAnswers(state),
    hasAnsweredCurrentQuestion: selectHasAnsweredCurrentQuestion(state),
    isPlaying: selectIsPlaying(state),
    hasPlayed: selectHasPlayed(state),
    questionsAnswered: selectQuestionsAnswered(state),
    correctlyAnswered: selectCorrectlyAnswered(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    answeredQuestion: (answerWasCorrect) => {
      dispatch(answeredQuestion(answerWasCorrect));
    },
    clickedPlay: () => {
      dispatch(clickedPlay());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
