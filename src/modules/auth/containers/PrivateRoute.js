import { connect } from 'react-redux';
import PrivateRoute from '../components/PrivateRoute';

export default connect(
  (state, ownProps) => ({
    authenticated: ownProps.adminOnly ?
      state.auth.loggedIn && state.auth.currentUser.isAdmin 
      : 
      state.auth.loggedIn,
  }),
)(PrivateRoute);
