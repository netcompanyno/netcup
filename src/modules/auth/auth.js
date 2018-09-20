import { APP } from '../../constants';

const CURRENT_USER_CHANGED = `${APP}/auth/currentUserChanged`;

const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CURRENT_USER_CHANGED: {
      return { ...state, currentUser: action.payload };
    }
    default: return state;
  }
}

export const updateCurrentUser = user => ({ type: CURRENT_USER_CHANGED, payload: user }); 
