import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  selectQuestionsAnswered,
  selectCorrectlyAnswered,
} from './score.redux';
import './score.css';

export class Score extends Component {
  render() {
    const {
      questionsAnswered,
      correctlyAnswered
    } = this.props;
    const pct = questionsAnswered > 0 ? Math.round(correctlyAnswered*100.0/questionsAnswered) : '-';
    return (
      <div className="Score">
        <div className="Score-label">
          Score:
        </div>
        <div className="Score-values">
          {`${correctlyAnswered} / ${questionsAnswered} (${pct} %)`}
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
