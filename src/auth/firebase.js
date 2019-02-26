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
  fetch(`${process.env.BACKEND_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  });
