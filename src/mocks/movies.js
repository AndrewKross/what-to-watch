const imgFolder = `./img/`;

export default [
  {
    title: `Revenant`,
    src: imgFolder + `revenant.jpg`,
    genre: `Action`,
  },
  {
    title: `War of the Worlds`,
    src: imgFolder + `war-of-the-worlds.jpg`,
    genre: `Sci-Fi`,
  },
  {
    title: `Snatch`,
    src: imgFolder + `snatch.jpg`,
    genre: `Comedy`,
  },
  {
    title: `Shutter Island`,
    src: imgFolder + `shutter-island.jpg`,
    genre: `Thriller`,
  },
  {
    title: `Pulp Fiction`,
    src: imgFolder + `pulp-fiction.jpg`,
    genre: `Crime`,
  },
].map((film, i) => {
  film.id = film.title + i;
  return film;
});
