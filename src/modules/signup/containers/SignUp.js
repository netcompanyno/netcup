import { connect } from 'react-redux';
import SignUp from '../components/SignUp';
import { updateEmail, updatePassword, signup } from '../signup';

export default connect(
  state => ({
    email: state.signup.email,
    password: state.signup.password,
    loggedIn: !!(state.auth.currentUser && state.auth.currentUser.uid),
  }),
  (dispatch, ownProps) => ({
    onChangeEmail: email => dispatch(updateEmail(email)),
    onChangePassword: password => dispatch(updatePassword(password)),
    signup: () => dispatch(signup),
  }),
)(SignUp);
