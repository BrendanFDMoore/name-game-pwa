import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';

import Person from '../person';
import Answer from '../answer';

export class Question extends Component {
  render() {
    const {
      question,
      answers,
      answerHandler,
      hasAnswered = false,
      allAnswers = [],
      useAutocomplete = false,
    } = this.props;

    const answerElements = answers.map((a, index) => (
      <Answer
        key={index + a.rng}
        label={a.text}
        isCorrect={a.correct}
        answerHandler={answerHandler}
        disabled={hasAnswered} />
    ));

    // Autocomplete sends back the string of the answer, so we need to
    // pass on the result of whether that string is correct or not.
    const autocompleteAnswerHandler = (response) => {
      answerHandler(response === question.name);
    };

    const autocompleteElement = (
      <div>
        <AutoComplete
          key={question.name}
          floatingLabelText="Start typing a name..."
          filter={(searchText, key) => (searchText.length > 1 && key.toUpperCase().includes(searchText.toUpperCase()))}
          searchText={''}
          dataSource={allAnswers}
          openOnFocus={false}
          onNewRequest={autocompleteAnswerHandler}
          menuStyle={ { maxHeight: '200px' } }
          maxSearchResults={20}
        />
      </div>
    );

    const paperStyle = {
      display: 'inline-block',
      width: '30vh',
      margin: 10,
      fontWeight: 600,
    };

    const questionWrapperStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    };

    const answerWrapperStyle = {
      width: '85%',
      marginLeft: 'auto',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      margin: 3,
    };

    return (
      <div className="Question" style={questionWrapperStyle}>
        <Paper style={paperStyle}> Who is this? </Paper>
        <Person name={question.name} imageFilename={question.image} group={question.group} shouldShowName={hasAnswered} />
        <div style={answerWrapperStyle}>
          { useAutocomplete ? autocompleteElement : answerElements }
        </div>
      </div>
    );
  }
}

Question.PropTypes = {
  question: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,
  answerHandler: PropTypes.array.isRequired,
  hasAnswered: PropTypes.bool,
  useAutocomplete: PropTypes.bool,
  allAnswers: PropTypes.array,
};

export default Question;
