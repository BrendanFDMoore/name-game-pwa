import React from 'react';
import ReactDOM from 'react-dom';
import { Question } from './index';

describe('Question component', () =>{
  it('renders without crashing', () => {
    const questionProps = {
      person: {},
      answers: [{}, {}],
    };

    const div = document.createElement('div');
    ReactDOM.render(<Question {...questionProps} />, div);
  });
});
