import { APP } from '../../constants';
import { fetchEvents, signupForEvent, signOffForEvent } from './services/event-service';
import { sortEventsByDatetime } from './utils/dateutils';

const FETCH_EVENTS_START = `${APP}/events/FETCH_EVENTS_START`;
const FETCH_EVENTS_SUCCESS = `${APP}/events/FETCH_EVENTS_SUCCESS`;
const FETCH_EVENTS_FAILURE = `${APP}/events/FETCH_EVENTS_FAILURE`;
const FETCH_EVENTS_FINISH = `${APP}/events/FETCH_EVENTS_FINISH`;

const EVENT_SIGNUP_START = `${APP}/events/EVENT_SIGNUP_START`;
const EVENT_SIGNUP_SUCCESS = `${APP}/events/EVENT_SIGNUP_SUCCESS`;
const EVENT_SIGNUP_FAILURE = `${APP}/events/EVENT_SIGNUP_FAILURE`;
const EVENT_SIGNUP_FINISH = `${APP}/events/EVENT_SIGNUP_FINISH`;

const EVENT_SIGNOFF_START = `${APP}/events/EVENT_SIGNOFF_START`;
const EVENT_SIGNOFF_SUCCESS = `${APP}/events/EVENT_SIGNOFF_SUCCESS`;
const EVENT_SIGNOFF_FAILURE = `${APP}/events/EVENT_SIGNOFF_FAILURE`;
const EVENT_SIGNOFF_FINISH = `${APP}/events/EVENT_SIGNOFF_FINISH`;

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
    case EVENT_SIGNUP_START:
    case EVENT_SIGNOFF_START: {
      const copy = [ ...state.list ];
      const matchingEvent = copy.find(e => e.id === action.event.id);
      
      if (copy) {
        matchingEvent.loading = true;
      }
      return { ...state, list: copy };
    }
    case EVENT_SIGNUP_FINISH:
    case EVENT_SIGNOFF_FINISH: {
      const copy = [ ...state.list ];
      const matchingEvent = copy.find(e => e.id === action.event.id);

      if (copy) {
        delete matchingEvent.loading;
      }
      return { ...state, list: copy };
    }
    case EVENT_SIGNUP_SUCCESS: {
      const copy = [ ...state.list ];
      const matchingEvent = copy.find(e => e.id === action.event.id);

      if (matchingEvent) {
        matchingEvent.participants[action.participantId] = true;
      }
      return { ...state, list: copy };
    }
    case EVENT_SIGNOFF_SUCCESS: {
      const copy = [ ...state.list ];
      const matchingEvent = copy.find(e => e.id === action.event.id);

      if (matchingEvent) {
        delete matchingEvent.participants[action.participantId];
      }
      return { ...state, list: copy };
    }
    default: return state;
  }
};

export const loadEvents = () => async dispatch => {
  dispatch({ type: FETCH_EVENTS_START });
  try {
    const eventsFromApi = await fetchEvents(new Date().getFullYear());
    const events = eventsFromApi.map(event => ({
      id: event.id,
      description: event.description,
      image: event.image,
      title: event.title,
      datetime: event.datetime,
      participants: event.participants,
    }))
    .sort((e1, e2) => sortEventsByDatetime(e1.datetime, e2.datetime));

    dispatch({ type: FETCH_EVENTS_SUCCESS, payload: events });
  } catch (e) {
    dispatch({ type: FETCH_EVENTS_FAILURE });
  } finally {
    dispatch({ type: FETCH_EVENTS_FINISH });
  }
};

export const signup = event => async (dispatch, getState) => {
  dispatch({ type: EVENT_SIGNUP_START, event });

  try {
    const id = getState().auth.currentUser.uid;

    if (!id) {
      throw new Error('could not find id required for signup');
    }

    await signupForEvent(new Date().getFullYear(), event.id, id);
    dispatch({ type: EVENT_SIGNUP_SUCCESS, event, participantId: id });
  } catch (e) {
    dispatch({ type: EVENT_SIGNUP_FAILURE });
  } finally {
    dispatch({ type: EVENT_SIGNUP_FINISH, event });
  }
};

export const signoff = event => async (dispatch, getState) => {
  dispatch({ type: EVENT_SIGNOFF_START, event });

  try {
    const id = getState().auth.currentUser.uid;

    if (!id) {
      throw new Error('could not find id required for signoff');
    }

    await signOffForEvent(new Date().getFullYear(), event.id, id);
    dispatch({ type: EVENT_SIGNOFF_SUCCESS, event, participantId: id });
  } catch (e) {
    dispatch({ type: EVENT_SIGNOFF_FAILURE });
  } finally {
    dispatch({ type: EVENT_SIGNOFF_FINISH, event });
  }
};
