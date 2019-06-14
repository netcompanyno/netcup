import firebase from '../../../firebase/firebase';

export const fetchParticipants = async year => {
  try {
    const snapshot = await firebase.database().ref(`${year}/events`).once('value');
    const events = snapshot.val();
    const participants = {};

    for (const [eventId, eventData] of Object.entries(events)) {
      const eventParticipants = eventData.participants || [];

      for (const [userId, participantData] of Object.entries(eventParticipants)) {
        const points = parseInt(participantData.points, 10) || 0;

        if (participants[userId]) {
          participants[userId] += points
        } else {
          participants[userId] = points;
        }
      }
    }

    return participants;

  } catch (e) {
    throw new Error(e);
  }
}
