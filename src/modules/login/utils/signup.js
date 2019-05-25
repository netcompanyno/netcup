const regex = /.*@netcompany.com/;

export const verifyValidEmail = email => email && regex.test(email);
export const extractUserName = email => email && email.replace(/@netcompany.com/, '');
