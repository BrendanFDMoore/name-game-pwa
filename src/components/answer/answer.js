import React, { Component, PropTypes } from 'react';

export class Answer extends Component {
  render() {
    const {
      label,
      isCorrect,
      answerHandler,
    } = this.props;
    return (
      <div className="Answer" >
        <input type='button' onClick={() => answerHandler(isCorrect)} value={ label } />
      </div>
    );
  }
}

Answer.PropTypes = {
  label: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  answerHandler: PropTypes.func.isRequired,
};

export default Answer;
