import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

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

    const gameStyle = {
      height: '90vh',
      maxHeight: '90vh',
      width: '100vw',
      maxWidth: '100vw',
      display: 'flex',
      flexDirection:'column',
    };

    const activeGame = (
      <div style={gameStyle}>
        <div>
          <Question question={question} hasAnswered={hasAnsweredCurrentQuestion} answers={answers} answerHandler={answeredQuestion} />
        </div>
        <div>
          <Score />
        </div>
      </div>
    );

    const playAgain = hasPlayed ? ' again' : '';

    const avatarStyle = {margin: 10, padding: 10, animation: "Game-logo-spin infinite 10s linear"};
    const bodyStyle = {
      maxHeight: '90vh',
      flex: 1,
      display:'flex',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center'
    };
    const inactiveGame = (
      <Card containerStyle={bodyStyle} style={bodyStyle}>
        <CardTitle subtitle="A game to help you put names to faces" />
        <CardText style={bodyStyle}>
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
        <CardActions style={bodyStyle}>
          <RaisedButton label={`Play${playAgain}`} primary={true} onTouchTap={clickedPlay} />
        </CardActions>
      </Card>
    );

    const paperShellStyle = {
      height: '100vh',
      maxHeight: '100vh',
      width: '100vw',
      maxWidth: '100vw',
      display: 'flex',
      flexDirection:'column',
    };

    const appBarStyle = {
      height: '10vh',
    };
    const appBarTitleStyle = {
      lineHeight: '10vh',
      fontSize: '5vh',
    };
    return (
      <div className="Game">
        <Paper style={paperShellStyle} zDepth={0} >
          <AppBar
            style={appBarStyle}
            titleStyle={appBarTitleStyle}
            title="The Name Game"
            iconClassNameLeft="none"
            iconClassNameRight="none"
          />
          { isPlaying ? activeGame : inactiveGame }
        </Paper>
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
