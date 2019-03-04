import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid/lib';
import { TextField, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountBox from '@material-ui/icons/AccountBox';
import Lock from '@material-ui/icons/Lock';

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
      <form>
        <Row>
          <Col xs sm={6} smOffset={3} lg={4} lgOffset={4}>
            <TextField
              fullWidth
              type="email"
              required
              label="Email"
              autoComplete="email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              InputProps={{
                endAdornment:
                  <InputAdornment>
                    <AccountBox />
                  </InputAdornment>
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs sm={6} smOffset={3} lg={4} lgOffset={4}>
            <TextField
              style={{ marginTop: '10px' }}
              type="password"
              fullWidth
              required
              label="Password"
              autoComplete="current-password"
              password={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              InputProps={{
                endAdornment:
                  <InputAdornment>
                    <Lock />
                  </InputAdornment>
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs sm={6} smOffset={3} lg={1} lgOffset={7}>
            <Button
              onClick={() => this.props.onButtonClick(this.state.email, this.state.password)}
              style={{ marginTop: '30px' }}
              fullWidth
              variant="contained"
              color="primary">
              {this.props.buttonText}
            </Button>
          </Col>
        </Row>
      </form>
    )
  }
}

export default LoginForm;
