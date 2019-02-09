import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './modules/auth';
import Leaderboard from './modules/leaderboard';
import SignUp from './modules/signup';
import Login from './modules/login';
import { Toolbar, Typography } from '@material-ui/core';
import BottomNavigationBar from './modules/common/containers/BottomNavigationBar';

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
              <Route path="/login" component={Login} />
              <PrivateRoute path="/" exact component={Leaderboard} />
            </Switch>
            <BottomNavigationBar />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
