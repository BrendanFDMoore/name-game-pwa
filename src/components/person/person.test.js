import React from 'react';
import ReactDOM from 'react-dom';
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
    ReactDOM.render(<Person {...personProps} />, div);
  });
});
