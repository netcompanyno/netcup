import { APP } from '../../constants';
import { signUp, sendVerificationEmail } from '../../auth/firebase';
import { validEmail } from '../../auth/pre-auth-function';

const SIGNED_SUCCESSFULLY_UP_NOT_VERIFIED = `${APP}/signup/successful_signup_not_verified`;
const ERROR = `${APP}/signup/error`;
const UPDATE_EMAIL = `${APP}/signup/update_email`;
const UPDATE_PASSWORD = `${APP}/signup/update_password`;

const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SIGNED_SUCCESSFULLY_UP_NOT_VERIFIED: {
      return { ...state, showEmailCheckPrompt: true };
    }
    case ERROR: {
      return { ...state, errorMessage: action.payload.message, errorCode: action.payload.code };
    }
    case UPDATE_EMAIL: {
      return { ...state, email: action.payload };
    }
    case UPDATE_PASSWORD: {
      return { ...state, password: action.payload };
    }
    default: return state;
  }
}

export const signedUpSuccessfullyNotVerified = ({ type: SIGNED_SUCCESSFULLY_UP_NOT_VERIFIED });
export const error = error => ({ type: ERROR, payload: error });
export const updateEmail = email => ({ type: UPDATE_EMAIL, payload: email });
export const updatePassword = password => ({ type: UPDATE_PASSWORD, payload: password });

export const signup = (email, password) => async dispatch => {
  
  try {
    // TODO REIMPLEMENT EMAIL VALIDATION FUNCTION
    // const emailWasValid = await validEmail(email);
    const emailWasValid = true;
    if (!emailWasValid) {
      throw new Error({ message: 'Email submitted cannot be used to sign up with' });
    }
    await signUp(email, password);
    await sendVerificationEmail();
    dispatch(signedUpSuccessfullyNotVerified);
  } catch (e) {
    dispatch(error(e));
  }
};
