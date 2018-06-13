import { connect } from 'react-redux';
import SignUp from '../components/SignUp';
import { signUp } from '../../../auth/firebase';
import { create, error } from '../signup';

const signUpAction = async (email, password, dispatch) => {
  try {
    const creationResult = await signUp(email, password);
    dispatch(create(creationResult));
  } catch (e) {
    const { code } = e;
    dispatch(error(code));
  }
};

export default connect(
  state => ({

  }),
  dispatch => ({
   signUp: (email, password) => signUpAction(email, password, dispatch),
  }),
)(SignUp);
