import { combineReducers } from 'redux';

import leaderboard from '../modules/leaderboard/participants';
import signup from '../modules/login/signup';
import auth from '../modules/auth/auth';
import login from '../modules/login/login';
import events from '../modules/events/events';
import points from '../modules/admin-assign-points/points';
import users from '../modules/admin-assign-points/users';
import adminEvent from '../modules/admin-events/event';

export default combineReducers({
  leaderboard,
  signup,
  auth,
  login,
  events,
  points,
  users,
  adminEvent,
});
