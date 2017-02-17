import React, { Component, PropTypes } from 'react';

export class Person extends Component {
  render() {
    const {
      name,
      imageFilename,
      group,
      shouldShowName,
    } = this.props;

    return (
      <div className="Person">
        <div className="Person-image">
          <img alt='headshot' src={require(`../../images/${imageFilename}`)} width='200' />
        </div>
        <div className="Person-name">
          Name: { shouldShowName ? name : '???' }
        </div>
        { shouldShowName && group &&
          <div className="Person-name">
            { `Group: ${group}` }
          </div>
        }
      </div>
    );
  }
}

Person.PropTypes = {
  name: PropTypes.string.isRequired,
  imageFilename: PropTypes.string.isRequired,
  group: PropTypes.string,
  shouldShowName: PropTypes.bool.isRequired,
};

export default Person;
