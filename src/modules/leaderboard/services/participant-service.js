export const fetchParticipants = async (token, year) => {
  try {
    const res = await fetch(`${process.env.FIREBASE_DATABASE_URL}/leaderboards/${year}.json?auth=${token}`);
    return await res.ok ? res.json() : Promise.resolve({});
  } catch (e) {
    throw new Error(e);
  }
}

export const fetchUser = async (token, name) => {
  try {
    const res = await fetch(`${process.env.FIREBASE_DATABASE_URL}/users/${name}.json?auth=${token}`);
    return await res.ok ? res.json() : Promise.resolve({});
  } catch (e) {
    throw new Error(e);
  }
};
