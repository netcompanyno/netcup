export const parseFirebasePayload = participants => Object.keys(participants).map(id => ({ ...participants[id], id }));
