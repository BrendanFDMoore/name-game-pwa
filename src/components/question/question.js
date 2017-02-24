import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';

import Person from '../person';
import Answer from '../answer';

export class Question extends Component {
  render() {
    const {
      question,
      answers,
      answerHandler,
      hasAnswered = false,
    } = this.props;

    const answerElements = answers.map((a, index) => (
      <Answer
        key={index + a.rng}
        label={a.text}
        isCorrect={a.correct}
        answerHandler={answerHandler}
        disabled={hasAnswered} />
    ));

    const paperStyle = {
      display: 'inline-block',
      width: '30vh',
      margin: 10,
      fontWeight: 600,
    };

    return (
      <div className="Question">
        <Paper style={paperStyle}> Who is this? </Paper>
        <Person name={question.name} imageFilename={question.image} group={question.group} shouldShowName={hasAnswered} />
        { answerElements }
      </div>
    );
  }
}

Question.PropTypes = {
  question: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,
  answerHandler: PropTypes.array.isRequired,
  hasAnswered: PropTypes.bool,
};

export default Question;
