import { connect } from 'react-redux';
import PrivateRoute from '../components/PrivateRoute';

export default connect(
  state => ({
    isAuthenticated: () => {
      if (!state.auth.currentUser) {
        return false;
      }
      const { uid, emailVerified } = state.auth.currentUser;
      return uid && emailVerified;
    },
  }),
)(PrivateRoute);
