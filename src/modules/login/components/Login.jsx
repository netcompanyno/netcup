import React, { Component } from 'react';
import { Divider, Tabs, Tab, Snackbar } from '@material-ui/core';
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
    const { showPrompt, promptText, dismissPrompt } = this.props;
    return (
      <div style={{ marginLeft: '20px', marginRight: '20px', marginTop: '20px' }}>
        <Snackbar open={showPrompt} message={promptText} onClose={() => showPrompt && dismissPrompt()} />
        <Tabs
          fullWidth
          centered
          value={this.state.tabValue}
          onChange={(e, value) => this.setState({ tabValue: value })}>
          <Tab label="Sign in" fullWidth></Tab>
          <Tab label="Sign up" fullWidth></Tab>
        </Tabs>
        <Divider variant="fullWidth" style={{ marginBottom: '20px' }} />
        {this.state.tabValue === LOGIN_TAB &&
          <LoginForm
            buttonText="Login"
            loading={this.props.disableLoginButton}
            onButtonClick={(email, password) => this.props.login(email, password)}
          />
        }
        {this.state.tabValue === SIGNUP_TAB &&
          <LoginForm
            buttonText="Register"
            loading={this.props.disableSignupButton}
            onButtonClick={(email, password) => this.props.signup(email, password)}
          />
        }
        {this.state.tabValue === SIGNUP_TAB &&
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>
                Missing verification email after signup? 
                <br />
                Check mail quarantine with your company email: <a target="_blank"
                  rel="noopener noreferrer"
                  href={this.props.quarantineUrl}>
                  {this.props.quarantineUrl}
                </a>
              </p>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Login;
