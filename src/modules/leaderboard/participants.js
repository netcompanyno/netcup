import { fetchParticipants, fetchUser } from './services/participant-service';
import { parseParticipants } from './utilities/participant-parser';

const FETCH_PARTICIPANTS_START = 'netcup/leaderboard/FETCH_PARTICIPANTS_START';
const FETCH_PARTICIPANTS_SUCCESS = 'netcup/leaderboard/FETCH_PARTICIPANTS_SUCCESS';
const FETCH_PARTICIPANTS_FAILURE = 'netcup/leaderboard/FETCH_PARTICIPANTS_FAILURE';
const FETCH_PARTICIPANTS_FINISH = 'netcup/leaderboard/FETCH_PARTICIPANTS_FINISH';

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
    case FETCH_PARTICIPANTS_FAILURE: {
      return { ...state, participants: [] };
    }
    case FETCH_PARTICIPANTS_FINISH: {
      return { ...state, loading: false };
    }
    default: return state;
  }
};

export const loadParticipants = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_PARTICIPANTS_START });
  try {
    const token = getState().auth.token;
    
    if (!token) {
      throw new Error('token for api calls not set');
    }

    const participants = await fetchParticipants(token, new Date().getFullYear());
    const parsedParticipants = await Promise.all(parseParticipants(participants)
      .map(participant => fetchUser(token, participant.name)
      .then(user => ({ ...participant, image: user && user.image }))));

    dispatch({ type: FETCH_PARTICIPANTS_SUCCESS, payload: parsedParticipants });
  } catch (e) {
    dispatch({ type: FETCH_PARTICIPANTS_FAILURE });
  }
  dispatch({ type: FETCH_PARTICIPANTS_FINISH });
};
