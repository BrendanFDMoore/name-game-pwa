import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import { red300 } from 'material-ui/styles/colors';

import './game.css';
import face from '../../face.png';

import Person from '../person';
import Question from '../question';
import Score from '../score';
import {
  answeredQuestion,
  clickedPlay,
  toggleShowIncorrect,
  selectCurrentQuestion,
  selectCurrentAnswers,
  selectHasAnsweredCurrentQuestion,
  selectIsPlaying,
  selectHasPlayed,
  selectShowIncorrect,
  selectIncorrectToReview,
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
      incorrectToReview,
      showIncorrect,
      toggleShowIncorrect,
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
        { incorrectToReview && incorrectToReview.length > 0 &&
            <div>
              <RaisedButton label={`Review ${incorrectToReview.length} Incorrect Response(s)`} tertiary={true} onTouchTap={toggleShowIncorrect} />
            </div>
          }
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
          { incorrectToReview && incorrectToReview.length > 0 &&
            <RaisedButton label={`Review ${incorrectToReview.length} Incorrect Response(s)`} tertiary={true} onTouchTap={toggleShowIncorrect} />
          }
        </CardActions>
      </Card>
    );

    const reviewListPaperShellStyle = {
      height: '90vh',
      maxHeight: '90vh',
      width: '400px',
      maxWidth: '400px',
      display: 'flex',
      flexDirection:'column',
      overflow: 'scroll',
    };

    const reviewList = (
      <div>
        <Paper style={reviewListPaperShellStyle} zDepth={0} >      
          <div>Tap/click outside drawer to close.</div>  
        { 
          showIncorrect ? incorrectToReview.map((r, index) => {
            return <Person key={index} overrideMaxWidth={'360px'} name={r.name} imageFilename={r.image} group={r.group} shouldShowName={true}/>
          }) : (<div>These are not the mistakes you are looking for.</div>)
        }
        </Paper>
      </div>
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
    
    const appBarDrawerStyle = {
      height: '10vh',
      backgroundColor: red300,
    };
    const appBarDrawerTitleStyle = {
      lineHeight: '10vh',
      fontSize: '3.5vh',
    };
    return (
      <div className="Game">
        <Paper style={paperShellStyle} zDepth={0} >
          <Drawer width={400} openSecondary={true} open={showIncorrect} docked={false} onRequestChange={() => toggleShowIncorrect()} >
            <AppBar
              style={appBarDrawerStyle}
              title="Incorrect Responses"
              titleStyle={appBarDrawerTitleStyle}
              iconClassNameLeft="none"
              iconClassNameRight="none"
            />
            {reviewList}
          </Drawer>
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
  showIncorrect: PropTypes.bool,
  incorrectToReview: PropTypes.array,
  toggleShowIncorrect: PropTypes.func,
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
    showIncorrect: selectShowIncorrect(state),
    incorrectToReview: selectIncorrectToReview(state),
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
    toggleShowIncorrect: () => {
      dispatch(toggleShowIncorrect());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
