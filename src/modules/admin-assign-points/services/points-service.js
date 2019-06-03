import firebase from '../../../firebase/firebase';

export const updatePoints = async (year, eventId, userId, points) => {
  try {
    return firebase.database().ref(`${year}/events/${eventId}/participants/${userId}`).update({ points });
  } catch (e) {
    throw new Error(e);
  }
};
