import { APP } from '../../constants';
import { createUser } from '../../auth/firebase';
import { verifyValidEmail } from '../../auth/util';

const SIGNED_SUCCESSFULLY_UP_NOT_VERIFIED = `${APP}/signup/successful_signup_not_verified`;
const ERROR = `${APP}/signup/error`;
const DISMISS_ERROR_MESSAGE = `${APP}/signup/dismiss_error_message`;

const defaultState = {
  showErrorMessage: false,
  errorMessage: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
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

const signedUpSuccessfullyNotVerified = { type: SIGNED_SUCCESSFULLY_UP_NOT_VERIFIED };
const error = error => ({ type: ERROR, payload: error });
export const dismissErrorMessage = { type: DISMISS_ERROR_MESSAGE };

export const signup = (email, password) => async dispatch => {
  try {
    if (process.env.NODE_ENV !== 'development' && !verifyValidEmail(email)) {
      throw new Error({ message: 'Not a valid Netcompany email' });
    }

    await createUser(email, password);
    dispatch(signedUpSuccessfullyNotVerified);
  } catch (e) {
    dispatch(error(e));
  }
};
