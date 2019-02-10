const events = [
  {
    title: 'Title 1',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    image: "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fe%2Fe3%2FAustrian_mountains_over_a_lake_%2528Unsplash%2529.jpg&f=1",
  },
  {
    title: 'Title 2',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    image: "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fe%2Fe3%2FAustrian_mountains_over_a_lake_%2528Unsplash%2529.jpg&f=1",
  },
  {
    title: 'Title 3',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    image: "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fe%2Fe3%2FAustrian_mountains_over_a_lake_%2528Unsplash%2529.jpg&f=1",
  },
];

export const fetchEvents = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(events);
    }, 2000);
  })
}