export const fetchParticipants = () =>
  fetch(`${process.env.FIREBASE_DATABASE_URL}/leaderboards.json`)
    .then(res => res.ok ? res.json() : {});
