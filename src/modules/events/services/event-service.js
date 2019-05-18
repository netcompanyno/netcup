import firebase from '../../../firebase/firebase';

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

const toggleSignup = (year, eventId, userId, signup) => {
  try {
    return firebase.database().ref(`${year}/events/${eventId}/participants`).update({ [userId]: signup });
  } catch (e) {
    throw new Error(e);
  }
};

export const signupForEvent = async (year, eventId, userid) => toggleSignup(year, eventId, userid, true);
export const signOffForEvent = async (year, eventId, userid) => toggleSignup(year, eventId, userid, false);
