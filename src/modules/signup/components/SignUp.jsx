import React from 'react';
import { Col, Row } from 'react-flexbox-grid/lib';
import { TextField, Button } from '@material-ui/core';

class SignUp extends React.Component {
  componentDidUpdate() {
    if (this.props.loggedIn) {
      this.props.history.push('/');
    }
  }
  render() {
    return (
      <form style={{ marginLeft: '20px', marginRight: '20px', marginTop: '20px' }}>
        <Row>
          <Col xs sm={6} smOffset={3}>
            <TextField
              fullWidth
              type="email"
              required
              label="Email"
              value={this.props.email}
              onChange={e => this.props.onChangeEmail(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs sm={6} smOffset={3}>
            <TextField
              style={{ marginTop: '10px' }}
              type="password"
              fullWidth
              required
              label="Password"
              value={this.props.password}
              onChange={e => this.props.onChangePassword(e.target.value)}
              />
          </Col>
        </Row>
        <Row>
          <Col xs sm={6} smOffset={3}>
            <Button
              onClick={this.props.signup}
              style={{ marginTop: '40px' }}
              fullWidth
              variant="contained"
              color="primary">
              Sign up
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default SignUp;
