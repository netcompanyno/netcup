import firebase from '../../../firebase/firebase';

export const fetchUsers = async () => {
  try {
    const snapshot = await firebase.database().ref(`users`).once('value');
    return snapshot.val();
  } catch (e) {
    throw new Error(e);
  }
};
