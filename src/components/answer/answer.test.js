import React from 'react';
import ReactDOM from 'react-dom';
import { Answer } from './index';

describe('Answer component', () =>{
  it('renders without crashing', () => {
    const answerProps = {
      label: '',
      onClick: () => {},
    };

    const div = document.createElement('div');
    ReactDOM.render(<Answer {...answerProps} />, div);
  });
});
