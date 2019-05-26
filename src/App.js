import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Toolbar, Typography } from '@material-ui/core';
import { PrivateRoute } from './modules/auth';
import Leaderboard from './modules/leaderboard';
import Login from './modules/login';
import Events from './modules/events';
import BottomNavigationBar from './modules/common/containers/BottomNavigationBar';
import SignupVerification from './modules/login/containers/SignupVerification';
import { LOGIN, LEADERBOARD, EVENTS, SIGNUP_VERIFICATION } from './routing';

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
          <div>
            <Switch>
              <Route path={LOGIN} component={Login} />
              <PrivateRoute path={LEADERBOARD} exact component={Leaderboard} />
              <PrivateRoute path={EVENTS} exact component={Events} />
              <PrivateRoute path={SIGNUP_VERIFICATION} component={SignupVerification} />
            </Switch>
            <BottomNavigationBar />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
