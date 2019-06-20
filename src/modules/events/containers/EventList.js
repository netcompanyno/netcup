import { connect } from 'react-redux';
import { loadEvents, signup, signoff } from '../events';
import EventList from '../components/EventList';
import sanitize from '../../common/utils/html-sanitizer';
import { push, EDIT_EVENT } from '../../../routing';

export default connect(
  state => ({
    loading: state.events.loading,
    admin: state.auth.currentUser && state.auth.currentUser.isAdmin,
    events: state.events.list,
    userId: state.auth.currentUser.uid,
    eventLoading: state.events.eventLoading,
    formatDescription: sanitize,
  }),
  (dispatch, ownProps) => ({
    loadEvents: () => dispatch(loadEvents()),
    signup: event => dispatch(signup(event)),
    signoff: event => dispatch(signoff(event)),
    editEventClick: eventId => push({ ...ownProps.location, pathname: `${EDIT_EVENT}/${eventId}` }, ownProps.history),
  }),
)(EventList);
