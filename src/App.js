import React, { Component } from 'react';
import './App.css';
import Game from './components/game';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Game />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
