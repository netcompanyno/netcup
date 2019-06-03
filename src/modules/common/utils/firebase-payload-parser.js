export const parseFirebasePayload = object => Object.keys(object).map(id => ({ ...object[id], id }));
