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

const sortEventsByDatetime = (e1, e2) => {
  if (e1.getTime() > e2.getTime()) return -1;
  if (e1.getTime() < e2.getTime()) return 1;
  return 0; 
}

export const loadEvents = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_EVENTS_START });
  try {
    const token = getState().auth.token;

    if (!token) {
      throw new Error('token for api calls not set');
    }

    const eventsFromApi = await fetchEvents(new Date().getFullYear());
    const events = Object.keys(eventsFromApi)
      .map(id => ({ ...eventsFromApi[id], id }))
      .map(event => ({ 
        description: event.description,
        image: event.image,
        title: event.title,
        datetime: event.datetime && new Date(event.datetime)
      }))
      .sort((e1, e2) => sortEventsByDatetime(e1.datetime, e2.datetime));

    dispatch({ type: FETCH_EVENTS_SUCCESS, payload: events });
  } catch (e) {
    dispatch({ type: FETCH_EVENTS_FAILURE });
  }
  dispatch({ type: FETCH_EVENTS_FINISH });
};
