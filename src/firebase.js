import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const app = firebase.initializeApp({
  apiKey: `${process.env.FIREBASE_AUTH_API_TOKEN}`,
  databaseURL: `${process.env.FIREBASE_DATABASE_URL}`,
});

export const subscribeToUserChanged = (failure, success) => {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      success(user);
    } else {
      failure();
    }
  });
};

export const login = async (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const createUser = async (email, password) => {
  const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
  if (!result || !result.user) {
    throw new Error({ message: 'error during signup' });
  }
  return await result.user.sendEmailVerification({
    url: `${process.env.SIGNUP_REDIRECT_URL}`,
  });
};

export default app;
