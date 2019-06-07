import { APP } from '../../constants';
import { saveEvent as serviceSaveEvent } from './services/event-service';

const SAVE_EVENT_START = `${APP}/event/SAVE_EVENT_START`;
const SAVE_EVENT_SUCCESS = `${APP}/event/SAVE_EVENT_SUCCESS`;
const SAVE_EVENT_FAILURE = `${APP}/event/SAVE_EVENT_FAILURE`;
const SAVE_EVENT_FINISH = `${APP}/event/SAVE_EVENT_FINISH`;

const defaultState = {
  loading: false,
  event: {
    title: '',
    imageUrl: '',
    content: '',
    datetime: 1559853529000,
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_EVENT_START: {
      return { ...state, loading: true };
    }
    case SAVE_EVENT_SUCCESS: {
      return state;
    }
    case SAVE_EVENT_FAILURE: {
      return { ...state, error: true };
    }
    case SAVE_EVENT_FINISH: {
      return { ...state, loading: false };
    }
    default: return state;
  }
};

export const saveEvent = ({ title, imageUrl, content, datetime }) => async dispatch => {
  dispatch({ type: SAVE_EVENT_START });
  try {
    serviceSaveEvent(title, imageUrl, content, datetime);
    /*
    const events = eventsFromApi.map(event => ({
      id: event.id,
      description: event.description,
      image: event.image,
      title: event.title,
      datetime: event.datetime && new Date(event.datetime),
      participants: event.participants,
    }))
    .sort((e1, e2) => sortEventsByDatetime(e1.datetime, e2.datetime));
    */

    dispatch({ type: SAVE_EVENT_SUCCESS });
  } catch (e) {
    dispatch({ type: SAVE_EVENT_FAILURE });
  } finally {
    dispatch({ type: SAVE_EVENT_FINISH });
  }
};
