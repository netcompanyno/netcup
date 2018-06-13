import React, { Component } from 'react';
// import AppBar from 'material-ui/AppBar';
import AppBar from '@material-ui/core/AppBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Leaderboard from './modules/leaderboard';
import SignUp from './modules/signup';
import { Toolbar, Typography } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">{this.props.title}</Typography>
          </Toolbar>
        </AppBar>
        <Router>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/" exact component={Leaderboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
