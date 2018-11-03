export const fetchParticipants = async token => {
  try {
    const res = await fetch(`${process.env.FIREBASE_DATABASE_URL}/leaderboards.json?auth=${token}`);
    return await res.ok ? res.json() : Promise.resolve({});
  } catch (e) {
    throw new Error(e);
  }
}
