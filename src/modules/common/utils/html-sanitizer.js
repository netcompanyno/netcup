import purify from 'dompurify';

const sanitize = dirty => purify.sanitize(dirty);

export default sanitize;