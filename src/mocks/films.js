const srcUrl = `./img/`;

const titles = [
  `Revenant`, `War of the Worlds`, `Snatch`, `Shutter Island`, `Pulp Fiction`
];

const images = [
  `revenant.jpg`, `war-of-the-worlds.jpg`, `snatch.jpg`, `shutter-island.jpg`, `pulp-fiction.jpg`
];

const genres = [
  `Action`, `Sci-Fi`, `Comedy`, `Thriller`, `Crime`
];

const getRandomArrItem = (arr) => Math.floor(Math.random() * Math.floor(arr.length));

const createFilmData = () => {
  return {
    title: titles[getRandomArrItem(titles)],
    src: srcUrl + images[getRandomArrItem(images)],
    genre: genres[getRandomArrItem(genres)],
  };
};

const createFilmsData = (count) => {
  return new Array(count).fill(``).map((film, i) => {
    const filmData = createFilmData();
    filmData.id = filmData.title + i;
    return filmData;
  });
};

const moviesData = createFilmsData(5);

export {moviesData};

/*  export default [
  {
    title: `Revenant`,
    src: srcUrl + `revenant.jpg`,
    genre: `Action`,
  },
  {
    title: `War of the Worlds`,
    src: srcUrl + `war-of-the-worlds.jpg`,
    genre: `Sci-Fi`,
  },
  {
    title: `Snatch`,
    src: srcUrl + `snatch.jpg`,
    genre: `Comedy`,
  },
  {
    title: `Shutter Island`,
    src: srcUrl + `shutter-island.jpg`,
    genre: `Thriller`,
  },
  {
    title: `Pulp Fiction`,
    src: srcUrl + `pulp-fiction.jpg`,
    genre: `Crime`,
  },
]; */
