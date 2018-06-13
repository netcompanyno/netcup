import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: `${process.env.FIREBASE_AUTH_API_TOKEN}`,
});

export const signUp = async (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);
