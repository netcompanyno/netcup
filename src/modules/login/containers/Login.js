import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../login';
import Login from '../components/Login';
import { replace } from '../../../routing';

export default withRouter(connect(
  state => ({
    authenticated: state.auth.loggedIn,
  }),
  (dispatch, ownProps) => ({
    login: (email, password) => dispatch(login(email, password, () => replace(ownProps.location, ownProps.history))),
    load: (authenticated) => authenticated && replace(ownProps.location, ownProps.history),
  }),
)(Login));
