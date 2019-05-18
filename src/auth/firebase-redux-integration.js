import firebase from '../firebase';
import { updateCurrentUser, updateApiToken } from '../modules/auth/auth';

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

export const setupStore = (store) =>
  subscribeToUserChanged(
    async () => {

    },
    async user => {
      const { uid, email, emailVerified } = user;
      store.dispatch(updateCurrentUser({ uid, email, emailVerified }));
      console.log(uid, email, emailVerified);
      const token = await user.getIdToken();
      store.dispatch(updateApiToken(token));
    });

const listeners = [
  { integration: 'auth', registerStore: setupStore },
];

const registerListeners = store =>
  listeners.forEach(listener => {
    listener.registerStore(store);
    console.log('module', listener.integration, 'registered with firebase');
  });

export default registerListeners;
