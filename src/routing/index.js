export const LOGIN = '/login';
export const LEADERBOARD = '/';
export const EVENTS = '/events';
export const PROFILE = '/profile';

const redirectLocation = location => {
  if (location.state && location.state.from) {
    return location.state.from === LOGIN ? LEADERBOARD : location.state.from;
  }

  return LEADERBOARD;
};

export const replace = (location, history) => history.replace(redirectLocation(location));
export const push = (location, history) => history.push(location);
