import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AppBar from '../components/AppBar';
import { push, ASSIGN_POINTS } from '../../../routing';

export default withRouter(connect(
  (state, ownProps) => ({
    isAdmin: state.auth.loggedIn && state.auth.currentUser.isAdmin,
    goToPoints: () => push(ASSIGN_POINTS, ownProps.history),
  }),
)(AppBar));
