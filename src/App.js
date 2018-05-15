import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Leaderboard from './modules/leaderboard';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title={this.props.title} showMenuIconButton={false} />
        <Leaderboard header="Leaderboards" />
      </div>
    );
  }
}

export default App;
