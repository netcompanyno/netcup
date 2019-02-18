import React, { Component } from 'react';
import { Divider, Tabs, Tab } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoginForm from '../../common/components/LoginForm';

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
        {showPrompt &&
          <Dialog open={showPrompt}>
            <DialogTitle>Confirm your account</DialogTitle>
            <DialogContent>
              <DialogContentText>{`Check your email for confirmation link`}</DialogContentText>
            </DialogContent>
          </Dialog>
        }
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
