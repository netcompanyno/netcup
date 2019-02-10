import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BottomNavigationBar from '../components/BottomNavigationBar';
import { push, LEADERBOARD, EVENTS, PROFILE } from '../../../routing';

const mappings = [
  {
    index: 0,
    pathname: LEADERBOARD,
  },
  {
    index: 1,
    pathname: EVENTS,
  },
  {
    index: 2,
    pathname: PROFILE,
  },
];

const findIndexForPathName = pathname => {
  const mapping = mappings.find(mapping => mapping.pathname === pathname);
  return mapping ? mapping.index : 0;
};

const findPathNameForIndex = index  => {
  const mapping = mappings.find(mapping => mapping.index === index);
  return mapping ? mapping.pathname : LEADERBOARD;
};

export default withRouter(connect(
  (state, ownProps) => ({
    show: state.auth.loggedIn,
    value: findIndexForPathName(ownProps.location.pathname),
    switchTab: value => push({ ...ownProps.location, pathname: findPathNameForIndex(value) }, ownProps.history),
  }),
)(BottomNavigationBar));
