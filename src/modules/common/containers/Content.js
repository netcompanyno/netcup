import { connect } from 'react-redux';
import Content from '../components/Content';

export default connect(
  state => ({
    showSidebar: state.auth.loggedIn, 
  }),
)(Content);
