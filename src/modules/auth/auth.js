import { APP } from '../../constants';

const TOKEN_CHANGED = `${APP}/auth/tokenChanged`;
const CURRENT_USER_CHANGED = `${APP}/auth/currentUserChanged`;

const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CURRENT_USER_CHANGED: {
      return { ...state, currentUser: action.payload };
    }
    case TOKEN_CHANGED: {
      return { ...state, token: action.payload };
    }
    default: return state;
  }
}

export const updateApiToken = token => ({ type: TOKEN_CHANGED, payload: token });
export const updateCurrentUser = user => ({ type: CURRENT_USER_CHANGED, payload: user }); 
