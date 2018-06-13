import React from 'react';
import { Col, Row } from 'react-flexbox-grid/lib';

class SignUp extends React.Component {
  componentDidMount() {
    this.props.signUp('test@example.com', 'admin1234');
  }
  render() {
    return (
      <div></div>
    );
  }
}

export default SignUp;
