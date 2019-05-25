import firebase from '../../../firebase/firebase';
import { SIGNUP_VERIFICATION } from '../../../routing';
import { extractUserName } from '../utils/signup';

export const login = async (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const registerUser = async userId => {
  console.log('Saving user to database...');
  // Required for firebase to sync up with updated realtime database-rules
  // in order to create user
  await firebase.auth().currentUser.getIdToken(true);

  const snapshot = await firebase.database().ref(`users/${userId}`).once('value');

  if (snapshot.val()) {
    console.log('user already exists, skipping.');
    return Promise.resolve();
  }

  return firebase.database().ref(`users/${userId}`).set({
    username: extractUserName(firebase.auth().currentUser.email),
    created: new Date().getTime(),
  });
};

export const createUser = async (email, password) => {
  const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
  if (!result || !result.user) {
    throw new Error({ message: 'error during signup' });
  }

  return await result.user.sendEmailVerification({
    url: `${process.env.SIGNUP_REDIRECT_URL + SIGNUP_VERIFICATION}?id=${result.user.uid}`,
  });
};
