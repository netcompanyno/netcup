import { connect } from 'react-redux';
import { loadEvents } from '../events';
import EventList from '../components/EventList';

export default connect(
  state => ({
    loading: state.events.loading,
    events: state.events.list,
  }),
  dispatch => ({
    loadEvents: () => dispatch(loadEvents()),
  }),
)(EventList);
