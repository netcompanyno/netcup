import firebase from '../../../firebase/firebase';

export const createEvent = async (year, title, imageUrl, description, dateString) => {
  const date = new Date(Date.parse(dateString));
  const utcDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

  try {
    return firebase.database().ref(`${year}/events`).push({
      title,
      image: imageUrl,
      description,
      datetime: utcDate,
      participants: []
    });
  } catch (e) {
    throw new Error(e);
  }
};
