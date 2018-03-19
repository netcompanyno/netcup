import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import ParticipantsList from './modules/leaderboard/components/ParticipantList';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title={this.props.title} showMenuIconButton={false} />
        <ParticipantsList header="Leaderboards" participants={[
          {
            name: 'Test',
            shortname: 'Testesen',
            imageUrl: 'https://vignette.wikia.nocookie.net/legostarwars/images/2/2e/9489_stormtrooper.png/revision/latest?cb=20141103012716',
            points: 1,
          },
          {
            name: 'Test',
            shortname: 'Testesen',
            imageUrl: 'https://vignette.wikia.nocookie.net/legostarwars/images/2/2e/9489_stormtrooper.png/revision/latest?cb=20141103012716',
            points: 2,
          },
          {
            name: 'Test',
            shortname: 'Testesen',
            imageUrl: 'https://vignette.wikia.nocookie.net/legostarwars/images/2/2e/9489_stormtrooper.png/revision/latest?cb=20141103012716',
            points: 3,
          },
        ]} />
      </div>
    );
  }
}

export default App;
