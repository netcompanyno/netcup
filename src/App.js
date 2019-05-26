import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './modules/auth';
import Leaderboard from './modules/leaderboard';
import Login from './modules/login';
import Events from './modules/events';
import BottomNavigationBar from './modules/common/containers/BottomNavigationBar';
import AppBar from './modules/common/containers/AppBar';
import SignupVerification from './modules/login/containers/SignupVerification';
import { LOGIN, LEADERBOARD, EVENTS, SIGNUP_VERIFICATION } from './routing';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <AppBar title="NetCup" />
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
