import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { grey300, green600, red500 } from 'material-ui/styles/colors';

export class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wasClicked: false,
    };
  }

  handleClick() {
    const {
      isCorrect,
      answerHandler,
    } = this.props;
    answerHandler(isCorrect);
    this.setState({ wasClicked: true })
  }

  render() {
    const {
      label,
      isCorrect,
      disabled = false,
    } = this.props;

    const answerButtonStyle = {
      width: '66%',
      margin: 5,
    };
    
    let disabledBackgroundColor = grey300;
    if (isCorrect) {
      disabledBackgroundColor = green600;
    } else if (!isCorrect && this.state.wasClicked ) {
      disabledBackgroundColor = red500;
    }

    return (
      <div className="Answer" >
        <RaisedButton label={label} secondary={true} disabled={disabled} style={answerButtonStyle} disabledBackgroundColor={disabledBackgroundColor} onTouchTap={this.handleClick.bind(this)} />
      </div>
    );
  }
}

Answer.PropTypes = {
  label: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  answerHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Answer;
