export const fetchEvents = async (token, year) => {
  try {
    const res = await fetch(`${process.env.FIREBASE_DATABASE_URL}/events/${year}.json?auth=${token}`);
    return await res.ok ? res.json() : Promise.resolve({});
  } catch (e) {
    throw new Error(e);
  }
}
