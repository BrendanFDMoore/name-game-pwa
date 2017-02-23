import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const answerButtonStyle = {
  width: '66%',
  margin: 5,
};
export class Answer extends Component {
  render() {
    const {
      label,
      isCorrect,
      answerHandler,
    } = this.props;
    return (
      <div className="Answer" >
        <RaisedButton label={label} secondary={true} style={answerButtonStyle} onTouchTap={() => answerHandler(isCorrect)} />
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
