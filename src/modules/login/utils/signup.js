const regex = /.*@netcompany.com/;

export const verifyValidEmail = email => email && regex.test(email);
