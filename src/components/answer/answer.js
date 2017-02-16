import React, { Component, PropTypes } from 'react';

export class Answer extends Component {
  render() {
    const {
      label,
    } = this.props;
    return (
      <div className="Answer">
        { label }
      </div>
    );
  }
}

Answer.PropTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Answer;
