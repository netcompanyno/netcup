export const sortEventsByDatetime = (e1, e2) => {
  if (!e1 || !e2) return 0;
  if (e1.getTime() > e2.getTime()) return -1;
  if (e1.getTime() < e2.getTime()) return 1;
  return 0;
};

export const eventIsBeforeToday = e1 => e1.getTime() < new Date().getTime();
