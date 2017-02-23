import React from 'react';
import ReactTestUtils from 'react-addons-test-utils'
const renderer = ReactTestUtils.createRenderer();

import { Person } from './index';

describe('Person component', () =>{
  it('renders without crashing', () => {
    const personProps = {
      name: 'some name',
      imageFilename: 'tonystark1.jpg',
      group: 'some group',
      shouldShowName: false,
    };

    const div = document.createElement('div');
    renderer.render(<Person {...personProps} />, div);
  });
});
