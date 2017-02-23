import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

import './game.css';
import face from '../../face.png';

import Question from '../question';
import Score from '../score';
import {
  answeredQuestion,
  clickedPlay,
  selectCurrentQuestion,
  selectCurrentAnswers,
  selectHasAnsweredCurrentQuestion,
  selectIsPlaying,
  selectHasPlayed,
} from './game.redux'
import {
  selectQuestionsAnswered,
  selectCorrectlyAnswered,
} from '../score/score.redux';

export class Game extends Component {
  render() {
    const {
      question,
      answers,
      answeredQuestion,
      hasAnsweredCurrentQuestion,
      isPlaying,
      hasPlayed,
      clickedPlay,
    } = this.props;


    const activeGame = (
      <div>
        <div>
          <Question question={question} hasAnswered={hasAnsweredCurrentQuestion} answers={answers} answerHandler={answeredQuestion} />
        </div>
        <div>
          <Score />
        </div>
      </div>
    );

    const playAgain = hasPlayed ? ' again' : '';
    const lastScore = (
      <div>
        <div>
          Previous Score:
        </div>
        <div>
          <Score />
        </div>
      </div>
    );

    const paperStyle = {
      height: 150,
      width: 200,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
    const avatarStyle = {margin: 10, padding: 10, animation: "Game-logo-spin infinite 10s linear"};
    const inactiveGame = (
      <Card>
        <CardTitle subtitle="A game to help you put names to faces" />
        <CardText>
          <Avatar src={face} size={100} style={avatarStyle} />
          
          <div className="Game-intro">
            {
              hasPlayed ?
              <div>
                <div>
                  {'Game Over'}
                </div>
                <div>
                  <Score />
                </div>
              </div>
             : <div>Try to name the person shown in each picture.</div>
            }
          </div>
          <div className="Game-intro">
            {`Ready to play${playAgain}?`}
          </div>
        </CardText>
        <CardActions>
          <RaisedButton label={`Play${playAgain}`} primary={true} onTouchTap={clickedPlay} />
        </CardActions>
      </Card>
    );

    return (
      <div className="Game">
        <AppBar
          title="The Name Game"
          iconClassNameLeft="none"
          iconClassNameRight="none"
        />
        { isPlaying ? activeGame : inactiveGame }
      </div>
    );
  }
}

Game.PropTypes = {
  question: PropTypes.object,
  answers: PropTypes.array,
  answeredQuestion: PropTypes.func.isRequired,
  hasAnsweredCurrentQuestion: PropTypes.bool,
  isPlaying: PropTypes.bool,
  hasPlayed: PropTypes.bool,
  clickedPlay: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  return {
    question: selectCurrentQuestion(state),
    answers: selectCurrentAnswers(state),
    hasAnsweredCurrentQuestion: selectHasAnsweredCurrentQuestion(state),
    isPlaying: selectIsPlaying(state),
    hasPlayed: selectHasPlayed(state),
    questionsAnswered: selectQuestionsAnswered(state),
    correctlyAnswered: selectCorrectlyAnswered(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    answeredQuestion: (answerWasCorrect) => {
      dispatch(answeredQuestion(answerWasCorrect));
    },
    clickedPlay: () => {
      dispatch(clickedPlay());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
