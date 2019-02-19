import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: `${process.env.FIREBASE_AUTH_API_TOKEN}`,
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

export const signUp = async (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const sendVerificationEmail = async email =>
  firebase.auth().currentUser.sendEmailVerification({
    url: `${"http://localhost:3000"}`,
  });
