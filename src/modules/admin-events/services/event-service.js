export const saveEvent = async (title, imageUrl, content, dateString) => {
  console.log('title', title);
  console.log('imageUrl', imageUrl);
  console.log('content', content);

  const date = new Date(Date.parse(dateString));
  console.log('date', date);
  
  const utcDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

  console.log('utc', utcDate);
};
