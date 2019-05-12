import firebase from '../../../firebase';

export const fetchEvents = async year => {
  try {
    const snapshot = await firebase.database().ref(`${year}/events`).once('value');
    return snapshot.val();
  } catch (e) {
    throw new Error(e);
  }
};
