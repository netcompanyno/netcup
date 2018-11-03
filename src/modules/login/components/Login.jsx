import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import LoginForm from '../../common/components/LoginForm';


class Login extends Component {
  componentDidUpdate() {
    this.props.load(this.props.authenticated);
  }
  render() {
    return (
      <div>
        <LoginForm
          loginButtonText="Login"
          login={(email, password) => this.props.login(email, password)}
        />
        <Row style={{ marginTop: '20px' }}>
          <Col xs={12}>
            <Row center="xs">
              <Link to="/signup">Sign up</Link>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
