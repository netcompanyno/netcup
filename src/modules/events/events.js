import { APP } from '../../constants';
import { fetchEvents } from './services/event-service';

const FETCH_EVENTS_START = `${APP}/events/FETCH_EVENTS_START`;
const FETCH_EVENTS_SUCCESS = `${APP}/events/FETCH_EVENTS_SUCCESS`;
const FETCH_EVENTS_FAILURE = `${APP}/events/FETCH_EVENTS_FAILURE`;
const FETCH_EVENTS_FINISH = `${APP}/events/FETCH_EVENTS_FINISH`;

const defaultState = {
  loading: false,
  list: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_START: {
      return { ...state, loading: true };
    }
    case FETCH_EVENTS_SUCCESS: {
      return { ...state, list: action.payload };
    }
    case FETCH_EVENTS_FAILURE: {
      return { ...state, list: [] };
    }
    case FETCH_EVENTS_FINISH: {
      return { ...state, loading: false };
    }
    default: return state;
  }
};

export const loadEvents = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_EVENTS_START });
  try {
    const token = getState().auth.token;

    if (!token) {
      throw new Error('token for api calls not set');
    }

    const eventsFromApi = await fetchEvents(token, new Date().getFullYear());
    const events = Object.keys(eventsFromApi)
      .map(id => ({ ...eventsFromApi[id], id }))
      .map(event => ({ description: event.description, image: event.eventImageUrl, title: event.title }));

    dispatch({ type: FETCH_EVENTS_SUCCESS, payload: events });
  } catch (e) {
    dispatch({ type: FETCH_EVENTS_FAILURE });
  }
  dispatch({ type: FETCH_EVENTS_FINISH });
};
