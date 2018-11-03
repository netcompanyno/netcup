import { connect } from 'react-redux';
import PrivateRoute from '../components/PrivateRoute';

export default connect(
  state => ({
    authenticated: state.auth.loggedIn,
  }),
)(PrivateRoute);
