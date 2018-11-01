import { login as firebaseLogin } from '../../auth/firebase';
import { APP } from '../../constants';
import { updateCurrentUser, updateApiToken } from '../auth/auth';

const START_LOGIN = `${APP}/login/startLogin`;
const LOGIN_SUCCESS = `${APP}/login/loginSuccess`;
const LOGIN_FAILURE = `${APP}/login/loginFailure`;
const LOGIN_FINISH = `${APP}/login/finishedLogin`;

const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case START_LOGIN: {
      return { ...state, loading: true };
    }
    case LOGIN_SUCCESS: {
      return state;
    }
    case LOGIN_FAILURE: {
      return state;
    }
    case LOGIN_FINISH: {
      return { ...state, loading: false }
    }
    default: return state;
  }
}

const startLogin = { type: START_LOGIN };
const loginSuccess = { type: LOGIN_SUCCESS };
const loginFailure = { type: LOGIN_FAILURE };
const finishedLogin = { type: LOGIN_FINISH };

export const login = (userEmail, password, history, location) => async dispatch => {
  dispatch(startLogin);

  try {
    const res = await firebaseLogin(userEmail, password);
    const { uid, email, displayName, emailVerified } = res.user;
    const token = await res.user.getIdToken();

    dispatch(updateCurrentUser({ uid, email, displayName, emailVerified }));
    dispatch(updateApiToken(token));
    dispatch(loginSuccess);

    history.push(location);
  } catch (e) {
    dispatch(loginFailure);
    console.error(e);
  } finally {
    dispatch(finishedLogin);
  }
}