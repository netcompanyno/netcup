import { subscribeToUserChanged } from './firebase';
import { updateCurrentUser, updateApiToken } from '../modules/auth/auth';

export const isAuthenticated = state => {
  if (!state.auth.currentUser) {
    return false;
  }
  const { uid, emailVerified } = state.auth.currentUser;
  const token = state.auth.token;
  return uid && emailVerified && token;
};

export const setupStore = (store) =>
  subscribeToUserChanged(
    async () => {

    }, 
    async user => {
      const { uid, email, emailVerified } = user;
      store.dispatch(updateCurrentUser({ uid, email, emailVerified }));
      const token = await user.getIdToken();
      store.dispatch(updateApiToken(token));
    });
