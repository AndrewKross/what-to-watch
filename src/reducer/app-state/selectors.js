import { createSelector } from "reselect";
import { NameSpace } from "../reducer";
import { getFilms } from "../data/selectors";
import { getFilmsFilteredByGenre } from '../../utils/films';

const NAME_SPACE = NameSpace.APP_STATE;

export const getFilmsOnScreen = (state) => {
  return state[NAME_SPACE].filmsOnScreen;
};

export const getCurrentGenre = (state) => {
  return state[NAME_SPACE].currentGenre;
};

export const getFilteredFilms = createSelector(
  getFilms,
  getCurrentGenre,
  (films, genre) => {
    return getFilmsFilteredByGenre(films, genre);
  },
);
