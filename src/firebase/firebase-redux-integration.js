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
      console.log('user changed. Updating...');
      const { uid, email, emailVerified } = user;
      let isAdmin = false;
      try {
        const userInfo = await fetchUser(uid);
        isAdmin = userInfo && !!userInfo.admin; 
      } catch (e) {
        console.log('error while updating user');
      } finally {
        store.dispatch(updateCurrentUser({ uid, email, emailVerified, isAdmin }));
      }
    });

export default setupStore;
