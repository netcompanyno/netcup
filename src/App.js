import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Leaderboard from './modules/leaderboard';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title={this.props.title} showMenuIconButton={false} />
        <Router>
          <Route path="/leaderboard" component={Leaderboard} />
        </Router>
      </div>
    );
  }
}

export default App;
