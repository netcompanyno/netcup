import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid/lib';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoginForm from '../../common/components/LoginForm';

class SignUp extends Component {
  componentDidUpdate() {
    if (this.props.authenticated()) {
      this.props.history.push('/');
    }
  }

  render() {
    const showEmailPrompt = this.props.showEmailPrompt;
    return (
      showEmailPrompt ?
        <Row>
          <Col xs sm={6} smOffset={3}>
            <Dialog open={showEmailPrompt} onClose={() => console.log('closed')}>
              <DialogTitle>Confirm your account</DialogTitle>
              <DialogContent>
                <DialogContentText>{`Check your email for confirmation link`}</DialogContentText>
              </DialogContent>
            </Dialog>
          </Col>
        </Row>
        :
        <LoginForm
          loginButtonText="Sign up"
          login={(email, password) => this.props.signup(email, password)}
        />
    );
  }
}

export default SignUp;
