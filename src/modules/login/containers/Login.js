import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login, dismissErrorMessage as dismissLoginErrorMessage } from '../login';
import { signup, dismissErrorMessage as dismissSignUpErrorMessage } from '../signup';
import Login from '../components/Login';
import { replace } from '../../../routing';

const hasError = ({ signup, login }) =>
  signup.showErrorMessage || login.showErrorMessage;

const resolveErrorMessage = ({ signup, login }) => {
  if (signup.showErrorMessage) {
    return signup.errorMessage;
  }
  if (login.showErrorMessage) {
    return login.errorMessage;
  }
  return false;
};

export default withRouter(connect(
  state => ({
    quarantineUrl: process.env.QUARANTINE_URL,
    authenticated: state.auth.loggedIn,
    showPrompt: hasError(state),
    promptText: resolveErrorMessage(state),
  }),
  (dispatch, ownProps) => ({
    login: (email, password) => dispatch(login(email, password, () => replace(ownProps.location, ownProps.history))),
    signup: (email, password) => dispatch(signup(email, password, () => replace(ownProps.location, ownProps.history))),
    load: (authenticated) => authenticated && replace(ownProps.location, ownProps.history),
    dismissPrompt: () => dispatch(dismissSignUpErrorMessage) && dispatch(dismissLoginErrorMessage),
  }),
)(Login));
