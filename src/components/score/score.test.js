import React from 'react';
import ReactTestUtils from 'react-addons-test-utils'
const renderer = ReactTestUtils.createRenderer();

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
    renderer.render(<Score {...scoreProps} />, div);
  });
});
