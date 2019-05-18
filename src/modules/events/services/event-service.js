import firebase from '../../../firebase';

export const fetchEvents = async year => {
  try {
    const snapshot = await firebase.database().ref(`${year}/events`).once('value');
    const val = snapshot.val();
    return Object.keys(val)
      .map(id => ({ ...val[id], id }));
  } catch (e) {
    throw new Error(e);
  }
};

export const signupForEvent = async (year, eventId, userid) => {
  try {
    return firebase.database().ref(`${year}/events/${eventId}/participants`).update({ [userid]: true });
  } catch (e) {
    throw new Error(e);
  }
};

export const signOffForEvent = async (year, eventId, userid) => {
  try {
    return firebase.database().ref(`${year}/events/${eventId}/participants`).update({ [userid]: false });
  } catch (e) {
    throw new Error(e);
  }
};