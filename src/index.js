import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './styles/index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const NetCup = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <App title="NetCup" />
  </MuiThemeProvider>
);

ReactDOM.render(<NetCup />, document.getElementById('root'));
registerServiceWorker();
