import React, { Component, PropTypes } from 'react';

import Person from '../person';

export class Question extends Component {
  render() {
    const {
      person,
      shouldShowName = false,
    } = this.props;
    return (
      <div className="Question">
        <Person name={person.name} image={person.image} group={person.group} shouldShowName={shouldShowName} />
      </div>
    );
  }
}

Question.PropTypes = {
  person: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,
  shouldShowName: PropTypes.bool,
};

export default Question;
