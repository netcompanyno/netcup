import { APP } from '../../constants';

const TOKEN_CHANGED = `${APP}/auth/tokenChanged`;
const CURRENT_USER_CHANGED = `${APP}/auth/currentUserChanged`;

const defaultState = {};

const loggedIn = currentUser =>
  Boolean(currentUser &&
    currentUser.uid &&
    currentUser.emailVerified);

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CURRENT_USER_CHANGED: {
      const currentUser = action.payload;
      return { ...state, currentUser, loggedIn: loggedIn(currentUser) };
    }
    case TOKEN_CHANGED: {
      const currentUser = state.currentUser;
      return { ...state, loggedIn: loggedIn(currentUser) };
    }
    default: return state;
  }
}

export const updateCurrentUser = user => ({ type: CURRENT_USER_CHANGED, payload: user }); 
