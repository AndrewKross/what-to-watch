const filmAdapter = (film) => {
  return {
    id: film.id,
    released: film.released,
    description: film.description,
    director: film.director,
    genre: film.genre,
    title: film.name,
    backgroundImage: film.background_image,
    backgroundColor: film.background_color,
    posterImage: film.poster_image,
    previewImage: film.preview_image,
    previewVideo: film.preview_video_link,
    videoMain: film.video_link,
    rating: film.rating,
    ratingsCount: film.scores_count,
    runTime: film.run_time,
    starring: film.starring,
    isFavorite: film.is_favorite,
  };
};

const filmsAdapter = (films) => {
  return films.map((film) => {
    return filmAdapter(film);
  });
};

export { filmAdapter, filmsAdapter };
