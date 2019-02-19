import { APP } from '../../constants';
import { signUp, sendVerificationEmail } from '../../auth/firebase';
import { verifyValidEmail } from '../../auth/util';

const SIGNED_SUCCESSFULLY_UP_NOT_VERIFIED = `${APP}/signup/successful_signup_not_verified`;
const ERROR = `${APP}/signup/error`;
const DISMISS_FLASM = `${APP}/signup/dismiss_flash_message`;

const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case DISMISS_FLASM: {
      return { ...state, showFlashMessage: false, flashMessage: '' };
    }
    case SIGNED_SUCCESSFULLY_UP_NOT_VERIFIED: {
      return { ...state, showFlashMessage: true, flashMessage: 'Verification email sent' };
    }
    case ERROR: {
      return { 
        ...state,
        showFlashMessage: true,
        flashMessage: action.payload.message,
      };
    }
    default: return state;
  }
}

export const signedUpSuccessfullyNotVerified = { type: SIGNED_SUCCESSFULLY_UP_NOT_VERIFIED };
export const error = error => ({ type: ERROR, payload: error });
export const dismissFlashMessage = { type: DISMISS_FLASM };

export const signup = (email, password) => async dispatch => {
  try {
    if (!process.env.NODE_ENV === 'development' && !verifyValidEmail(email)) {
      throw new Error('Not a valid Netcompany email');
    }
    await signUp(email, password);
    await sendVerificationEmail(email);
    dispatch(signedUpSuccessfullyNotVerified);
  } catch (e) {
    dispatch(error(e));
  }
};
