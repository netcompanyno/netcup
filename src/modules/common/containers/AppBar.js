import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AppBar from '../components/AppBar';
import { push, ASSIGN_POINTS, LEADERBOARD, EVENTS, PROFILE, CREATE_EVENT } from '../../../routing';

export default withRouter(connect(
  (state, ownProps) => ({
    show: state.auth.loggedIn,
    isAdmin: state.auth.currentUser && state.auth.currentUser.isAdmin,
    goToPoints: () => push({ ...ownProps.location, pathname: ASSIGN_POINTS }, ownProps.history),
    goToLeaderBoard: () => push({ ...ownProps.location, pathname: LEADERBOARD }, ownProps.history),
    goToEvents: () => push({ ...ownProps.location, pathname: EVENTS }, ownProps.history),
    goToProfile: () => push({ ...ownProps.location, pathname: PROFILE }, ownProps.history),
    goToCreateEvent: () => push({ ...ownProps.location, pathname: CREATE_EVENT }, ownProps.history),
  }),
)(AppBar));
