import { APP } from '../../constants';
import { createUser } from './services/auth-service';
import { verifyValidEmail } from './utils/signup';

const SIGNED_SUCCESSFULLY_UP_NOT_VERIFIED = `${APP}/signup/successful_signup_not_verified`;
const ERROR = `${APP}/signup/error`;
const DISMISS_ERROR_MESSAGE = `${APP}/signup/dismiss_error_message`;
const START_SIGNUP = `${APP}/signup/start_signup`;
const FINISHED_SIGNUP = `${APP}/signup/finished_signup`;

const defaultState = {
  loading: false,
  showErrorMessage: false,
  errorMessage: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case START_SIGNUP: {
      return { ...state, loading: true };
    }
    case FINISHED_SIGNUP: {
      return { ...state, loading: false };
    }
    case DISMISS_ERROR_MESSAGE: {
      return { ...state, showErrorMessage: false, errorMessage: '' };
    }
    case SIGNED_SUCCESSFULLY_UP_NOT_VERIFIED: {
      return { ...state, showErrorMessage: true, errorMessage: 'Verification email sent' };
    }
    case ERROR: {
      return { 
        ...state,
        showErrorMessage: true,
        errorMessage: action.payload.message,
      };
    }
    default: return state;
  }
}

const startSignup = ({ type: START_SIGNUP });
const finishedSignup = ({ type: FINISHED_SIGNUP });
const signedUpSuccessfullyNotVerified = { type: SIGNED_SUCCESSFULLY_UP_NOT_VERIFIED };
export const error = error => ({ type: ERROR, payload: error });
export const dismissErrorMessage = { type: DISMISS_ERROR_MESSAGE };

export const signup = (email, password) => async dispatch => {
  dispatch(startSignup);
  try {
    if (process.env.NODE_ENV !== 'development' && !verifyValidEmail(email)) {
      throw new Error({ message: 'Not a valid Netcompany email' });
    }
    await createUser(email, password);
    dispatch(signedUpSuccessfullyNotVerified);
  } catch (e) {
    dispatch(error(e));
  } finally {
    dispatch(finishedSignup);
  }
};
