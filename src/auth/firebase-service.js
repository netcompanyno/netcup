import firebase from '../firebase';

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
