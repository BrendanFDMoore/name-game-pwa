import React, { Component, PropTypes } from 'react';

import Person from '../person';
import Answer from '../answer';

export class Question extends Component {
  render() {
    const {
      question,
      answers,
      answerHandler,
      shouldShowName = false,
    } = this.props;

    const answerElements = answers.map((a, index) => (
      <Answer key={index} label={a.text} isCorrect={a.correct} answerHandler={answerHandler} />
    ));

    return (
      <div className="Question">
        Who is this?
        <Person name={question.name} imageFilename={question.image} group={question.group} shouldShowName={shouldShowName} />
        { answerElements }
      </div>
    );
  }
}

Question.PropTypes = {
  question: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,
  answerHandler: PropTypes.array.isRequired,
  shouldShowName: PropTypes.bool,
};

export default Question;
