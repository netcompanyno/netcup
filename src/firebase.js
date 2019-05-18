import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const app = firebase.initializeApp({
  apiKey: `${process.env.FIREBASE_AUTH_API_TOKEN}`,
  databaseURL: `${process.env.FIREBASE_DATABASE_URL}`,
});

export default app;
