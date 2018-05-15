import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux'
import store from './store';
import './styles/index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const NetCup = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <App title="NetCup" />
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(<NetCup />, document.getElementById('root'));
registerServiceWorker();
