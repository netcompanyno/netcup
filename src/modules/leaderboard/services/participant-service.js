export const fetchParticipants = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        [
          {
            name: 'Test',
            shortname: 'Testesen',
            imageUrl: 'https://vignette.wikia.nocookie.net/legostarwars/images/2/2e/9489_stormtrooper.png/revision/latest?cb=20141103012716',
            points: 1,
          },
          {
            name: 'Test',
            shortname: 'Testesen',
            imageUrl: 'https://vignette.wikia.nocookie.net/legostarwars/images/2/2e/9489_stormtrooper.png/revision/latest?cb=20141103012716',
            points: 2,
          },
          {
            name: 'Test',
            shortname: 'Testesen',
            imageUrl: 'https://vignette.wikia.nocookie.net/legostarwars/images/2/2e/9489_stormtrooper.png/revision/latest?cb=20141103012716',
            points: 3,
          },
        ]
      )
    }, 2000);
  });
};
