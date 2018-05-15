const sortParticipants = participants =>
  participants.sort((e1, e2) => {
    if (e1.points > e2.points) {
      return -1;
    }
    if (e2.points > e1.points) {
      return 1;
    }
    return 0;
  });

export default sortParticipants;
