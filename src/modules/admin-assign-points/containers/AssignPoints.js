import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AssignPoints from '../components/AssignPoints';
import { assignPoints } from '../points';
import { loadEvents } from '../../events/events';
import { loadUsers } from '../users';
import { parseFirebasePayload } from '../../common/utils/firebase-payload-parser';

const collapseEvents = (events, users) => {
  if (!events || !users) {
    return [];
  }
  return events.map(event => {
    const participants = parseFirebasePayload(event.participants)
      .map(participant => {
        const userInfo = users[participant.id];
        return { ...participant, fullname: userInfo ? userInfo.username : participant.id };
      });

    return { ...event, participants };
  });
};

export default withRouter(connect(
  state => ({
    loading: state.events.loading || state.users.loading,
    events: collapseEvents(state.events.list, state.users.list),
    eventsPresent: state.events.list && state.events.list.length,
    usersPresent: state.users.list && state.users.list.length
  }),
  dispatch => ({
    load: async (eventsPresent, usersPresent) => {
      if (!eventsPresent) {
        dispatch(loadEvents());
      }
      if (!usersPresent) {
        dispatch(loadUsers());
      }
    },
    assignPoints: async (eventId, userId, points) => dispatch(assignPoints(eventId, userId, points)),
  })
)(AssignPoints));
