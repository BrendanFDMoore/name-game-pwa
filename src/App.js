import React, { Component } from 'react';
import logo from './logo.svg';
import face from './face.png';
import './App.css';
import Game from './components/game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={face} className="App-logo" alt="logo" />
          <h2>The Name Game</h2>
          <p>A game to help you put names to faces.</p>

        </div>
        <p className="App-intro">
          Try to name the people shown in the picture.
        </p>
        <Game />
      </div>
    );
  }
}

export default App;
