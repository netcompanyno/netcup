import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CreateEvent from '../components/CreateEvent';
import { saveEvent, dismissUpdate } from '../event';
import sanitize from '../../common/utils/html-sanitizer';
import { push, EVENTS } from '../../../routing';

export default withRouter(connect(
  state => ({
    loading: state.adminEvent.loading,
    showSnackbar: state.adminEvent.updated,
    snackbarMessage: 'Successfully created event. Redirecting...',
  }),
  (dispatch, ownProps) => ({
    dismissSnackbar: () => dispatch(dismissUpdate),
    save: ({ title, imageUrl, content, datetime }) =>
      dispatch(saveEvent(
        { title, imageUrl, content: sanitize(content), datetime },
        () => setTimeout(() => push({ ...ownProps.location, pathname: EVENTS }, ownProps.history), 2000))
      ),
  }),
)(CreateEvent));
