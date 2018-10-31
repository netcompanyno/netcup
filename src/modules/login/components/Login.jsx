import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import LoginForm from '../../common/components/LoginForm';


class Login extends Component {
  
  /**
   * TODO FIX THIS TO NOT USE CURRENT LIFECYCLE METHOD
   */
  componentWillReceiveProps() {
    if (this.props.authenticated()) {
      const location = this.props.location.state ? this.props.location.state.from : '/';
      this.props.history.push(location);
    }
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
