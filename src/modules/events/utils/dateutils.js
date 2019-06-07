export const sortEventsByDatetime = (datetime1, datetime2) => {
  const e1 = new Date(datetime1);
  const e2 = new Date(datetime2);
  if (!e1 || !e2) return 0;
  if (e1.getTime() > e2.getTime()) return -1;
  if (e1.getTime() < e2.getTime()) return 1;
  return 0;
};

export const eventIsBeforeToday = datetime => new Date(datetime).getTime() < new Date().getTime();
