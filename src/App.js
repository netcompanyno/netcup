import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { RouteHandler } from 'react-router';
//import logo from './logo.svg';
import './App.css';
import Event from './modules/event/components/Event';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title={this.props.title} />
        <section className="main-content">
          <RouteHandler />
        </section>
        <Event />
      </div>
    );
  }
}

export default App;
