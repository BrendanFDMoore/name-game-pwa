import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Question from '../question';
import Score from '../score';

import testImage from '../../images/tonystark1.jpg';

const testPerson = {
  name: 'Tony Stark',
  group: 'Avengers',
  image: testImage,
}
const testAnswers = [];

export class Game extends Component {
  render() {
    return (
      <div className="Game">
        <div>
          <Question person={testPerson} shouldShowName={true} answers={testAnswers} />
        </div>
        <div>
          <Score />
        </div>
      </div>
    );
  }
}

Game.PropTypes = {
};

function mapStateToProps(state, props) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
