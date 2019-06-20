import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CreateEvent from '../components/CreateEvent';
import { saveEvent, dismissUpdate } from '../event';
import sanitize from '../../common/utils/html-sanitizer';
import { loadEvents } from '../../events/events';
import { push, EVENTS } from '../../../routing';

const load = (eventId, list = []) => {
  const { title = '', description = '', image = '', datetime } = list.find(event => event.id === eventId) || {};
  return { title, content: description, imageUrl: image, datetime };
};

export default withRouter(connect(
  (state, ownProps) => ({
    loading: state.adminEvent.loading || state.events.loading,
    showSnackbar: state.adminEvent.updated,
    snackbarMessage: 'Successfully updated event. Redirecting...',
    editing: true,
    events: state.events.list,
    ...load(ownProps.match.params.eventId, state.events.list),
  }),
  (dispatch, ownProps) => ({
    load: events => {
      if (!events || !events.length) {
        dispatch(loadEvents());
      }
    },
    dismissSnackbar: () => dispatch(dismissUpdate),
    save: ({ title, imageUrl, content, datetime }) =>
      dispatch(saveEvent(
        { id: ownProps.match.params.eventId, title, imageUrl, content: sanitize(content), datetime },
        () => setTimeout(() => push({ ...ownProps.location, pathname: EVENTS }, ownProps.history), 2000))
      ),
  })
)(CreateEvent));
