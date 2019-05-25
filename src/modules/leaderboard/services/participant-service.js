import firebase from '../../../firebase/firebase';

export const fetchParticipants = async year => {
  try {
    const snapshot = await firebase.database().ref(`${year}/leaderboards`).once('value');
    return snapshot.val();
  } catch (e) {
    throw new Error(e);
  }
}

export const fetchUser = async id => {
  try {
    const snapshot = await firebase.database().ref(`users/${id}`).once('value');
    return snapshot.val();
  } catch (e) {
    throw new Error(e);
  }
};
