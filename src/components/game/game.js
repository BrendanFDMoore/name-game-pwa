import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { nextQuestion } from './game.redux'
import Question from '../question';
import Score from '../score';
import { answeredQuestion } from '../score/score.redux.js'
import { selectCurrentQuestion, selectCurrentAnswers } from '../game/game.redux.js'

export class Game extends Component {
  render() {
    const {
      question,
      answers,
      answeredQuestion,
    } = this.props;
    console.log(question,
      answers);
    return (
      <div className="Game">
        <div>
          <Question question={question} shouldShowName={false} answers={answers} answerHandler={answeredQuestion} />
        </div>
        <div>
          <Score />
        </div>
      </div>
    );
  }
}

Game.PropTypes = {
  question: PropTypes.object,
  answers: PropTypes.array,
  answeredQuestion: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  return {
    question: selectCurrentQuestion(state),
    answers: selectCurrentAnswers(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    answeredQuestion: (answerWasCorrect) => {
      dispatch(answeredQuestion(answerWasCorrect))
      dispatch(nextQuestion())
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
