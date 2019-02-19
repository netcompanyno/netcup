import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../login';
import { signup, dismissFlashMessage } from '../signup';
import Login from '../components/Login';
import { replace } from '../../../routing';

export default withRouter(connect(
  state => ({
    authenticated: state.auth.loggedIn,
    showPrompt: state.signup.showFlashMessage || false,
    promptText: state.signup.flashMessage,
  }),
  (dispatch, ownProps) => ({
    login: (email, password) => dispatch(login(email, password, () => replace(ownProps.location, ownProps.history))),
    signup: (email, password) => dispatch(signup(email, password, () => replace(ownProps.location, ownProps.history))),
    load: (authenticated) => authenticated && replace(ownProps.location, ownProps.history),
    dismissPrompt: () => dispatch(dismissFlashMessage),
  }),
)(Login));
