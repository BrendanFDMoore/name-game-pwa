import React from 'react';
import ReactTestUtils from 'react-addons-test-utils'
const renderer = ReactTestUtils.createRenderer();

import { Question } from './index';

describe('Question component', () =>{
  it('renders without crashing', () => {
    const questionProps = {
      question: {
        image: 'tonystark1.jpg'
      },
      answers: [{}, {}],
    };

    const div = document.createElement('div');
    renderer.render(<Question {...questionProps} />, div);
  });
});
