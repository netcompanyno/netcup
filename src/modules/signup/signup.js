import { APP } from '../../constants';

const CREATE = `${APP}/signup/create`;
const ERROR = `${APP}/signup/error`;

const defaultState = {

};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE: {
      console.log(action.payload);
      return state;
    }
    case ERROR: {
      return { ...state, errorMessage: action.payload };
    }
    default: return state;
  }
}

export const create = result => ({
  type: CREATE,
  payload: result,
});

export const error = error => ({
  type: ERROR,
  payload: error,
});
