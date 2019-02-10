import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BottomNavigationBar from '../components/BottomNavigationBar';
import { switchTab } from '../bottom-action-bar';

export default withRouter(connect(
  state => ({
    show: state.auth.loggedIn,
    value: state.bottomNavigationBar.index,
  }),
  dispatch => ({
    switchTab: value => dispatch(switchTab(value)),
  }),
)(BottomNavigationBar));
