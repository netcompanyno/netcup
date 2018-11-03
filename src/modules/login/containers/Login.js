import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../login';
import Login from '../components/Login';

const redirectLocation = location => {
  if (location.state && location.state.from) {
    return location.state.from === '/login' ? '/' : location.state.from;
  }

  return '/';
};

const redirect = (location, history) => history.replace(redirectLocation(location));

export default withRouter(connect(
  state => ({
    authenticated: state.auth.loggedIn,
  }),
  (dispatch, ownProps) => ({
    login: (email, password) => dispatch(login(email, password, () => redirect(ownProps.location, ownProps.history))),
    load: (authenticated) => authenticated && redirect(ownProps.location, ownProps.history),
  }),
)(Login));
