import { connect } from 'react-redux';
import PrivateRoute from '../components/PrivateRoute';

export default connect(
  state => ({
    isAuthenticated: () => !!(state.auth.currentUser && state.auth.currentUser.uid),
  }),
)(PrivateRoute);
