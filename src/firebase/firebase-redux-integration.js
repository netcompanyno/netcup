import firebase from './firebase';
import { updateCurrentUser } from '../modules/auth/auth';

const subscribeToUserChanged = (failure, success) => {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      success(user);
    } else {
      failure();
    }
  });
};

const setupStore = store =>
  subscribeToUserChanged(
    async () => {},
    async user => {
      const { uid, email, emailVerified } = user;
      store.dispatch(updateCurrentUser({ uid, email, emailVerified }));
    });

export default setupStore;
