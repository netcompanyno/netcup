import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import ParticipantsList from './modules/leaderboard/components/ParticipantList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title={this.props.title} showMenuIconButton={false} />
        <ParticipantsList header="Leaderboards" participants={[]} />
      </div>
    );
  }
}

export default App;
