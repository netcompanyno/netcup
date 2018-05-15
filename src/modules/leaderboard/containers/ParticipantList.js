import { connect } from 'react-redux';
import ParticipantList from '../components/ParticipantList';
import { loadParticipants } from '../participants';
import sortParticipants from '../utilities/sort-participants';

export default connect(
  state => ({
    participants: sortParticipants(state.leaderboard.participants),
    loading: state.leaderboard.loading,
  }),
  dispatch => ({
    loadParticipants: () => dispatch(loadParticipants()),
  }),
)(ParticipantList);
