import firebase from 'firebase/app';
import 'firebase/auth';
import store from '../store';
import { updateCurrentUser } from '../modules/auth/auth';

firebase.initializeApp({
  apiKey: `${process.env.FIREBASE_AUTH_API_TOKEN}`,
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(updateCurrentUser(user));
  }
});

export const signUp = async (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);
