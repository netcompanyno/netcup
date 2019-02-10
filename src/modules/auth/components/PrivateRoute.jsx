import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN } from '../../../routing';

class PrivateRoute extends Component {
  render() {
    const { component: Component, authenticated, ...rest } = this.props;

    return (
      <Route {...rest} render={props => (
        authenticated
          ? <Component {...props} />
          : <Redirect to={{ pathname: LOGIN, state: { from: props.location } }} />
      )} />
    )
  }
}

export default PrivateRoute;
