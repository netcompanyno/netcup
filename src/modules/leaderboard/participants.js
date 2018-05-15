import { fetchParticipants } from './services/participant-service';

const FETCH_PARTICIPANTS_START = 'netcup/participants/FETCH_PARTICIPANTS_START';
const FETCH_PARTICIPANTS_SUCCESS = 'netcup/participants/FETCH_PARTICIPANTS_SUCCESS';
const FETCH_PARTICIPANTS_FAILURE = 'netcup/participants/FETCH_PARTICIPANTS_FAILURE';
const FETCH_PARTICIPANTS_FINISH = 'netcup/participants/FETCH_PARTICIPANTS_FINISH';

const defaultState = {
  participants: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PARTICIPANTS_START: {
      return { ...state, loading: true };
    }
    case FETCH_PARTICIPANTS_SUCCESS: {
      return { ...state, participants: action.payload };
    }
    case FETCH_PARTICIPANTS_FINISH: {
      return { ...state, loading: false };
    }
    default: return state;
  }
};

export const loadParticipants = () => async dispatch => {
  dispatch({ type: FETCH_PARTICIPANTS_START });
  try {
    const participants = await fetchParticipants();
    dispatch({ type: FETCH_PARTICIPANTS_SUCCESS, payload: participants });
  } catch (e) {
    dispatch({ type: FETCH_PARTICIPANTS_FAILURE });
  }
  dispatch({ type: FETCH_PARTICIPANTS_FINISH });
};
