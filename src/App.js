import React, { Component } from 'react';
import './App.css';
import Game from './components/game';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red500, red700, purple900, purple600} from 'material-ui/styles/colors';
// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: red500,
    primary2Color: red700,
    // primary3Color: grey400,
    accent1Color: purple900,
    accent2Color: purple600,
    // accent3Color: grey500,
  },
});


class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <Game />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
