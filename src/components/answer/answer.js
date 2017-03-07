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
      flexBasis: 'fit-content',
      margin: 3,
    };

    const buttonLabelStyle = {
      fontSize: '2.5vw',
    };

    // Crude check against window size to set fixed font for large breakpoints
    // Note: this will not adjust dynamically with screen resize.
    if (window && window.matchMedia && window.matchMedia("(min-width: 800px)").matches) {
      buttonLabelStyle.fontSize = '20px';
    }
    
    let disabledBackgroundColor = grey300;
    if (isCorrect) {
      disabledBackgroundColor = green600;
    } else if (!isCorrect && this.state.wasClicked ) {
      disabledBackgroundColor = red500;
    }

    return (
      <RaisedButton
        secondary={true}
        style={answerButtonStyle}
        label={label}
        labelStyle={buttonLabelStyle}
        disabled={disabled}
        disabledBackgroundColor={disabledBackgroundColor}
        onTouchTap={this.handleClick.bind(this)} />
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
