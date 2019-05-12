import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux'
import store from './store';
import registerListeners from './firebase-redux-integration';
import './styles/index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const NetCup = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={createMuiTheme()}>
      <App title="NetCup" />
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(<NetCup />, document.getElementById('root'));
registerListeners(store);
registerServiceWorker();
