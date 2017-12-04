import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const NetCup = () => (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <App title="NetCup" />
    </MuiThemeProvider>
);

ReactDOM.render(<NetCup />, document.getElementById('root'));
registerServiceWorker();
