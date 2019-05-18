import firebase from './firebase';
import { updateCurrentUser, updateApiToken } from '../modules/auth/auth';

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
      console.log(uid, email, emailVerified);
      const token = await user.getIdToken();
      store.dispatch(updateApiToken(token));
    });

export default setupStore;
