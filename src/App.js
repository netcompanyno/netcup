import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title={this.props.title} />
      </div>
    );
  }
}

export default App;
