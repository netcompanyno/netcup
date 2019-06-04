import { fetchUser } from '../common/services/user-service';
import { fetchParticipants } from './services/participant-service';
import defaultProfileImage from './assets/images/default_profile_image.jpg';

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

const formatParticipants = async participants => {
  const parsedParticipants = [];
  for (const [userId, points] of Object.entries(participants)) {
    try {
      const user = await fetchUser(userId);
      parsedParticipants.push({ id: userId, fullname: user.username, image: user && user.image || defaultProfileImage, points });
    } catch (e) {
      parsedParticipants.push({ id: userId, fullname: '[no username found]', image: defaultProfileImage, points });
    }
  }

  return parsedParticipants;
}

export const loadParticipants = () => async dispatch => {
  dispatch({ type: FETCH_PARTICIPANTS_START });
  try {
    const participants = await fetchParticipants(new Date().getFullYear());
    const parsedParticipants = await formatParticipants(participants);
    dispatch({ type: FETCH_PARTICIPANTS_SUCCESS, payload: parsedParticipants });
  } catch (e) {
    dispatch({ type: FETCH_PARTICIPANTS_FAILURE });
  }
  dispatch({ type: FETCH_PARTICIPANTS_FINISH });
};
