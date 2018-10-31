import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: `${process.env.FIREBASE_AUTH_API_TOKEN}`,
});

export const login = async (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const signUp = async (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const sendVerificationEmail = () =>
  firebase.auth().currentUser.sendEmailVerification();
