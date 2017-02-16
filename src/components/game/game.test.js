import React from 'react';
import { Game } from './index';
import ReactTestUtils from 'react-addons-test-utils'

const renderer = ReactTestUtils.createRenderer();

describe('Game component', () =>{
  it('renders without crashing', () => {
    const gameProps = {
    };

    const div = document.createElement('div');
    renderer.render(<Game {...gameProps} />, div);
  });
});
