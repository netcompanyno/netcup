import { APP } from '../../constants';
import { updatePoints } from './services/points-service';

const ASSIGN_POINTS_START = `${APP}/ASSIGN_POINTS/ASSIGN_POINTS_START`;
const ASSIGN_POINTS_SUCCESS = `${APP}/ASSIGN_POINTS/ASSIGN_POINTS_SUCCESS`;
const ASSIGN_POINTS_FINISH = `${APP}/ASSIGN_POINTS/ASSIGN_POINTS_FINISH`;
const ASSIGN_POINTS_FAILURE = `${APP}/ASSIGN_POINTS/ASSIGN_POINTS_FAILURE`;
const DISMISS_UPDATE = `${APP}/ASSIGN_POINTS/DISMISS_UPDATE`;

const defaultState = {
  updated: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ASSIGN_POINTS_START: {
      return { ...state, loading: true, updated: false };
    }
    case ASSIGN_POINTS_SUCCESS: {
      return { ...state, updated: true };
    }
    case ASSIGN_POINTS_FINISH: {
      return { ...state, loading: false };
    }
    case DISMISS_UPDATE: {
      return { ...state, updated: false };
    }
    default: return state;
  }
};

export const assignPoints = (eventId, userId, points) => async dispatch => {
  dispatch({ type: ASSIGN_POINTS_START });
  try {
    await updatePoints(new Date().getFullYear(), eventId, userId, parseInt(points, 10));
    dispatch({ type: ASSIGN_POINTS_SUCCESS });
  } catch (e) {
    dispatch({ type: ASSIGN_POINTS_FAILURE, e });
  } finally {
    dispatch({ type: ASSIGN_POINTS_FINISH });
  }
};

export const dismissUpdate = { type: DISMISS_UPDATE };