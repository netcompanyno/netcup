import { connect } from 'react-redux';
import ParticipantList from '../components/ParticipantList';
import { loadParticipants } from '../participants';

export default connect(
  state => ({
    participants: state.leaderboard.participants,
    loading: state.leaderboard.loading,
  }),
  dispatch => ({
    loadParticipants: () => dispatch(loadParticipants()),
  }),
)(ParticipantList);
