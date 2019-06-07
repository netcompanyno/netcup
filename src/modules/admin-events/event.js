import { APP } from '../../constants';
import { createEvent as serviceSaveEvent } from './services/event-service';

const SAVE_EVENT_START = `${APP}/admin-events/SAVE_EVENT_START`;
const SAVE_EVENT_SUCCESS = `${APP}/admin-events/SAVE_EVENT_SUCCESS`;
const SAVE_EVENT_FAILURE = `${APP}/admin-events/SAVE_EVENT_FAILURE`;
const SAVE_EVENT_FINISH = `${APP}/admin-events/SAVE_EVENT_FINISH`;
const DISMISS_UPDATE = `${APP}/admin-events/DISMISS_UPDATE`;

const defaultState = {
  loading: false,
  event: {
    title: '',
    imageUrl: '',
    content: '',
    datetime: '',
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_EVENT_START: {
      return { ...state, loading: true, updated: false };
    }
    case SAVE_EVENT_SUCCESS: {
      return { ...state, updated: true };
    }
    case SAVE_EVENT_FAILURE: {
      return { ...state, error: true };
    }
    case SAVE_EVENT_FINISH: {
      return { ...state, loading: false };
    }
    case DISMISS_UPDATE: {
      return { ...state, updated: false };
    }
    default: return state;
  }
};

export const saveEvent = ({ title, imageUrl, content, datetime }) => async dispatch => {
  dispatch({ type: SAVE_EVENT_START });
  try {
    const image = imageUrl || 'https://images.unsplash.com/photo-1520367288098-2794e86c3586?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80';
    await serviceSaveEvent(new Date().getFullYear(), title, image, content, datetime);
    dispatch({ type: SAVE_EVENT_SUCCESS });
  } catch (e) {
    dispatch({ type: SAVE_EVENT_FAILURE });
  } finally {
    dispatch({ type: SAVE_EVENT_FINISH });
  }
};

export const dismissUpdate = { type: DISMISS_UPDATE };
