import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../login';
import Login from '../components/Login';

export default withRouter(connect(
  state => ({
    authenticated: () => !!(state.auth.currentUser && state.auth.currentUser.uid),
  }),
  dispatch => ({
    login: (email, password, history, location) => dispatch(login(email, password, history, location)),
  }),
)(Login));
