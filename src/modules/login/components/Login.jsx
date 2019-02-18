import React, { Component } from 'react';
import { Divider, Tabs, Tab } from '@material-ui/core';
import ConfirmEmailDialog from './ConfirmEmailDialog';
import LoginForm from './LoginForm';

const LOGIN_TAB = 0;
const SIGNUP_TAB = 1;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
    };
  }
  componentDidUpdate() {
    this.props.load(this.props.authenticated);
  }
  render() {
    const { showPrompt } = this.props;
    return (
      <div style={{ marginLeft: '20px', marginRight: '20px', marginTop: '20px' }}>
        <ConfirmEmailDialog showPrompt={showPrompt} />
        <Tabs
          fullWidth
          value={this.state.tabValue}
          onChange={(e, value) => this.setState({ tabValue: value })}>
          <Tab label="Sign in" fullWidth></Tab>
          <Tab label="Sign up" fullWidth></Tab>
        </Tabs>
        <Divider variant="fullWidth" style={{ marginBottom: '20px' }} />
        {this.state.tabValue === LOGIN_TAB &&
          <LoginForm
            buttonText="Login"
            onButtonClick={(email, password) => this.props.login(email, password)}
          />
        }
        {this.state.tabValue === SIGNUP_TAB &&
          <LoginForm
            buttonText="Register"
            onButtonClick={(email, password) => this.props.signup(email, password)}
          />
        }
      </div>
    );
  }
}

export default Login;
