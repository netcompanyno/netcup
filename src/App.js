import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Leaderboard from './modules/leaderboard';
import SignUp from './modules/signup';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title={this.props.title} showMenuIconButton={false} />
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
