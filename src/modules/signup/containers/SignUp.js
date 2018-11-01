import { connect } from 'react-redux';
import SignUp from '../components/SignUp';
import { updateEmail, updatePassword, signup } from '../signup';

export default connect(
  state => ({
    authenticated: () => !!(state.auth.currentUser &&
      state.auth.currentUser.uid &&
      state.auth.currentUser.emailVerified),
    showEmailPrompt: state.signup.showEmailCheckPrompt,
  }),
  dispatch => ({
    signup: (email, password) => dispatch(signup(email, password)),
  }),
)(SignUp);
