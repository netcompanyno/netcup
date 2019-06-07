import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CreateEvent from '../components/CreateEvent';
import { saveEvent, dismissUpdate } from '../event';

export default withRouter(connect(
  state => ({
    loading: state.adminEvent.loading,
    title: state.adminEvent.event.title,
    imageUrl: state.adminEvent.event.imageUrl,
    content: state.adminEvent.event.content,
    datetime: state.adminEvent.event.datetime,
    showSnackbar: state.adminEvent.updated,
  }),
  dispatch => ({
    dismissSnackbar: () => dispatch(dismissUpdate),
    save: ({ title, imageUrl, content, datetime }) =>
      dispatch(saveEvent({ title, imageUrl, content, datetime })),
  })
)(CreateEvent));
