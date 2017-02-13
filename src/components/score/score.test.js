import React from 'react';
import ReactDOM from 'react-dom';
import {Score} from './index';

describe('Score component', () =>{
  it('renders without crashing', () => {
    const scoreProps = {
      questionsAnswered: 1,
      correctlyAnswered: 1,
      answeredQuestion: () => {},
      resetScore: () => {},
    };

    const div = document.createElement('div');
    ReactDOM.render(<Score {...scoreProps} />, div);
  });
});
