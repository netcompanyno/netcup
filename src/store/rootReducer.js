import { combineReducers } from 'redux';

import leaderboard from '../modules/leaderboard/participants';
import signup from '../modules/signup/signup';

export default combineReducers({
  leaderboard,
  signup,
});
