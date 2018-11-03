import { combineReducers } from 'redux';

import leaderboard from '../modules/leaderboard/participants';
import signup from '../modules/signup/signup';
import auth from '../modules/auth/auth';
import login from '../modules/login/login';

export default combineReducers({
  leaderboard,
  signup,
  auth,
  login,
});
