import React from 'react';
import ReactTestUtils from 'react-addons-test-utils'
import App from './App';

const renderer = ReactTestUtils.createRenderer();

describe('App component', () =>{
  it('renders without crashing', () => {
    const div = document.createElement('div');
    renderer.render(<App />, div);
  });
});
