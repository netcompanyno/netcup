export const validEmail = email =>
  fetch(process.env.FIREBASE_EMAIL_VALIDATION_URL, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
  .then(res => res.ok);