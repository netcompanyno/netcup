import { login as firebaseLogin } from './services/auth-service';
import { APP } from '../../constants';

const START_LOGIN = `${APP}/login/startLogin`;
const LOGIN_FAILURE = `${APP}/login/loginFailure`;
const LOGIN_FINISH = `${APP}/login/finishedLogin`;
const DISMISS_ERROR_MESSAGE = `${APP}/login/dismissErrorMessage`;

const defaultState = {
  loading: false,
  showErrorMessage: false,
  errorMessage: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case START_LOGIN: {
      return { ...state, loading: true, showErrorMessage: false, errorMessage: '' };
    }
    case LOGIN_FAILURE: {
      return { ...state, showErrorMessage: true, errorMessage: action.payload.message };
    }
    case LOGIN_FINISH: {
      return { ...state, loading: false }
    }
    case DISMISS_ERROR_MESSAGE: {
      return { ...state, showErrorMessage: false, errorMessage: '' };
    }
    default: return state;
  }
}

const startLogin = { type: START_LOGIN };
const loginFailure = ({ code, message }) => ({ type: LOGIN_FAILURE, payload: { code, message } });
const finishedLogin = { type: LOGIN_FINISH };
export const dismissErrorMessage = { type: DISMISS_ERROR_MESSAGE };

export const login = (userEmail, password, redirect) => async dispatch => {
  dispatch(startLogin);
  try {
    await firebaseLogin(userEmail, password);
    redirect();
  } catch (e) {
    dispatch(loginFailure(e));
  } finally {
    dispatch(finishedLogin);
  }
}
