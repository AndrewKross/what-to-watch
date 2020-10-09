import moment from 'moment';
import { RatingGrade, RatingRange } from '../const';

export const getRatingGrade = (rating) => {
  switch (true) {
    case rating >= RatingRange.MIN && rating < RatingRange.MAX_BAD:
      return RatingGrade.BAD;

    case rating >= RatingRange.MAX_BAD && rating < RatingRange.MAX_NORMAL:
      return RatingGrade.NORMAL;

    case rating >= RatingRange.MAX_NORMAL && rating < RatingRange.MAX_GOOD:
      return RatingGrade.GOOD;

    case rating >= RatingRange.MAX_GOOD && rating < RatingRange.MAX:
      return RatingGrade.VERY_GOOD;

    case rating === RatingRange.MAX:
      return RatingGrade.AWESOME;

    default:
      return RatingGrade.BAD;
  }
};

export const getFilmsFilteredByGenre = (films, genre) => {
  return genre === `All genres` ? films : films.filter((film) => film.genre === genre);
};

export const formatVideoElapsed = (runtimeBySecond) => {
  return moment.utc(runtimeBySecond * 1000).format(`HH:mm:ss`);
};

export const getFilmFromRoute = (filmsData, match) => {
  return filmsData.find((film) => film.id === +match.params.id);
};
