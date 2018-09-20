import { APP } from '../../constants';
import { signUp } from '../../auth/firebase';

const CREATE = `${APP}/signup/create`;
const ERROR = `${APP}/signup/error`;
const UPDATE_EMAIL = `${APP}/signup/update_email`;
const UPDATE_PASSWORD = `${APP}/signup/update_password`;

const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE: {
      return state;
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

export const create = result => ({ type: CREATE, payload: result });
export const error = error => ({ type: ERROR, payload: error });
export const updateEmail = email => ({ type: UPDATE_EMAIL, payload: email });
export const updatePassword = password => ({ type: UPDATE_PASSWORD, payload: password });

export const signup = async (dispatch, getState) => {
  const { email, password } = getState().signup;
  
  try {
    const creationResult = await signUp(email, password);
    dispatch(create(creationResult));
  } catch (e) {
    dispatch(error(e));
  }
};
