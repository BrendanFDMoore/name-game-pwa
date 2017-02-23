import React from 'react';
import ReactTestUtils from 'react-addons-test-utils'
const renderer = ReactTestUtils.createRenderer();

import { Answer } from './index';

describe('Answer component', () =>{
  it('renders without crashing', () => {
    const answerProps = {
      label: 'label value',
      onClick: () => {},
    };

    const div = document.createElement('div');
    renderer.render(<Answer {...answerProps} />, div);
  });
});
