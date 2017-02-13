import React from 'react';
import ReactDOM from 'react-dom';
import Score from './index';

describe('Score component', () =>{
    it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Score />, div);
    });
});
