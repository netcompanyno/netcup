import { APP } from '../../constants';
import { fetchUsers } from './services/user-service';

const FETCH_USERS_START = `${APP}/ASSIGN_POINTS/FETCH_USERS_START`;
const FETCH_USERS_SUCCESS = `${APP}/ASSIGN_POINTS/FETCH_USERS_SUCCESS`;
const FETCH_USERS_FINISH = `${APP}/ASSIGN_POINTS/FETCH_USERS_FINISH`;
const FETCH_USERS_FAILURE = `${APP}/ASSIGN_POINTS/FETCH_USERS_FAILURE`;

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_USERS_START: {
      return { ...state, loading: true };
    }
    case FETCH_USERS_SUCCESS: {
      return { ...state, list: action.payload };
    }
    case FETCH_USERS_FINISH: {
      return { ...state, loading: false };
    }
    default: return state;
  }
};

export const loadUsers = () => async dispatch => {
  dispatch({ type: FETCH_USERS_START });
  try {
    const users = await fetchUsers();
    dispatch({ type: FETCH_USERS_SUCCESS, payload: users });
  } catch (e) {
    dispatch({ type: FETCH_USERS_FAILURE, e });
  } finally {
    dispatch({ type: FETCH_USERS_FINISH });
  }
};
