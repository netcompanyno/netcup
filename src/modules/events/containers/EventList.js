import { connect } from 'react-redux';
import { loadEvents, signup, signoff } from '../events';
import EventList from '../components/EventList';

export default connect(
  state => ({
    loading: state.events.loading,
    events: state.events.list,
    id: state.auth.currentUser.uid,
    eventLoading: state.events.eventLoading,
  }),
  dispatch => ({
    loadEvents: () => dispatch(loadEvents()),
    signup: event => dispatch(signup(event)),
    signoff: event => dispatch(signoff(event)),
  }),
)(EventList);
