import firebase from '../../../firebase/firebase';

const convertToUtcDate = dateString => {
  const date = new Date(Date.parse(dateString));
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
};

export const save = async ({ year, title, image, description, dateString }) => {
  try {
    return firebase.database().ref(`${year}/events`).push({
      title,
      image,
      description,
      datetime: convertToUtcDate(dateString)
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const update = async ({ year, id, title, image, description, dateString }) => {
  try {
    return firebase.database().ref(`${year}/events/${id}`).set({
      title,
      image,
      description,
      datetime: convertToUtcDate(dateString)
    });
  } catch (e) {
    throw new Error(e);
  }
};
