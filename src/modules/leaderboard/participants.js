import { fetchUser } from '../common/services/user-service';
import { fetchParticipants } from './services/participant-service';
import { parseFirebasePayload } from '../common/utils/firebase-payload-parser';
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

export const loadParticipants = () => async dispatch => {
  dispatch({ type: FETCH_PARTICIPANTS_START });
  try {
    const participants = await fetchParticipants(new Date().getFullYear());
    const parsedParticipants = await Promise.all(parseFirebasePayload(participants)
      .map(participant => fetchUser(participant.id)
        .then(user => ({ ...participant, fullname: user.username, image: user && user.image || defaultProfileImage }))
        .catch(() => ({ ...participant, fullname: '[no user found]', image: defaultProfileImage }))
    ));

    dispatch({ type: FETCH_PARTICIPANTS_SUCCESS, payload: parsedParticipants });
  } catch (e) {
    console.error(e);
    dispatch({ type: FETCH_PARTICIPANTS_FAILURE });
  }
  dispatch({ type: FETCH_PARTICIPANTS_FINISH });
};
