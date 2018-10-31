import { connect } from 'react-redux';
import SignUp from '../components/SignUp';
import { updateEmail, updatePassword, signup } from '../signup';

export default connect(
  state => ({
    email: state.signup.email,
    password: state.signup.password,
    authenticated: () => !!(state.auth.currentUser &&
      state.auth.currentUser.uid &&
      state.auth.currentUser.emailVerified),
    showEmailPrompt: state.auth.currentUser && !state.auth.currentUser.emailVerified,
    email: state.currentUser && state.currentUser.email,
  }),
  dispatch => ({
    signup: (email, password) => dispatch(signup(email, password)),
  }),
)(SignUp);
