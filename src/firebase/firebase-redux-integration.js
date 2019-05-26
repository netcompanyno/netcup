import firebase from './firebase';
import { updateCurrentUser } from '../modules/auth/auth';
import { fetchUser } from '../modules/common/services/user-service';

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
      const userInfo = await fetchUser(uid);
      store.dispatch(updateCurrentUser({ uid, email, emailVerified, isAdmin: userInfo.admin || false }));
    });

export default setupStore;
