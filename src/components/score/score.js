import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  selectQuestionsAnswered,
  selectCorrectlyAnswered,
} from './score.redux';
import './score.css';
import Chip from 'material-ui/Chip';
import {blueGrey200} from 'material-ui/styles/colors';

export class Score extends Component {
  render() {
    const {
      questionsAnswered,
      correctlyAnswered
    } = this.props;
    const chipStyle = {
      display: 'inline-block',
      margin: 10,
      backgroundColor: blueGrey200,
      minWidth: '200px',
      width: '30vw',
    };
    const pct = questionsAnswered > 0 ? Math.round(correctlyAnswered*100.0/questionsAnswered) : '-';
    return (
      <div className="Score">
        <div className="Score-values">
          <Chip style={chipStyle} labelStyle={{fontWeight: 600}}>
            {`Score: ${correctlyAnswered} / ${questionsAnswered} ( ${pct}% )`}
          </Chip>
        </div>
      </div>
    );
  }
}

Score.PropTypes = {
  questionsAnswered: PropTypes.number.isRequired,
  correctlyAnswered: PropTypes.number.isRequired,
};

function mapStateToProps(state, props) {
  return {
    questionsAnswered: selectQuestionsAnswered(state),
    correctlyAnswered: selectCorrectlyAnswered(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);
