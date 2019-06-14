import { connect } from 'react-redux';
import { loadEvents, signup, signoff } from '../events';
import EventList from '../components/EventList';
import sanitize from '../../common/utils/html-sanitizer';

export default connect(
  state => ({
    loading: state.events.loading,
    events: state.events.list,
    userId: state.auth.currentUser.uid,
    eventLoading: state.events.eventLoading,
    formatDescription: sanitize,
  }),
  dispatch => ({
    loadEvents: () => dispatch(loadEvents()),
    signup: event => dispatch(signup(event)),
    signoff: event => dispatch(signoff(event)),
  }),
)(EventList);
