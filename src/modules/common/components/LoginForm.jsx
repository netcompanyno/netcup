import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid/lib';
import { TextField, Button } from '@material-ui/core';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
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
              autoComplete="email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
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
              autoComplete="current-password"
              password={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </Col>
        </Row>
        <Row>
          <Col xs sm={6} smOffset={3}>
            <Button
              onClick={() => this.props.login(this.state.email, this.state.password)}
              style={{ marginTop: '40px' }}
              fullWidth
              variant="contained"
              color="primary">
              {this.props.loginButtonText}
            </Button>
          </Col>
        </Row>
      </form>
    )
  }
}

export default LoginForm;
