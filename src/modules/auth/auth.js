import { APP } from '../../constants';

const TOKEN_CHANGED = `${APP}/auth/tokenChanged`;
const CURRENT_USER_CHANGED = `${APP}/auth/currentUserChanged`;

const defaultState = {};

const loggedIn = (currentUser, token) =>
  Boolean(currentUser &&
    currentUser.uid &&
    currentUser.emailVerified &&
    token);

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CURRENT_USER_CHANGED: {
      const currentUser = action.payload;
      const token = state.token;
      return { ...state, currentUser, loggedIn: loggedIn(currentUser, token) };
    }
    case TOKEN_CHANGED: {
      const currentUser = state.currentUser;
      const token = action.payload;
      return { ...state, token, loggedIn: loggedIn(currentUser, token) };
    }
    default: return state;
  }
}

export const updateApiToken = token => ({ type: TOKEN_CHANGED, payload: token });
export const updateCurrentUser = user => ({ type: CURRENT_USER_CHANGED, payload: user }); 
