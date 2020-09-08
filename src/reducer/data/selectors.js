import { NameSpace } from "../reducer";

const NAME_SPACE = NameSpace.DATA;

export const getFilteredFilms = (state) => {
  return state[NAME_SPACE].filteredFilms;
};

export const getFilms = (state) => {
  return state[NAME_SPACE].allFilms;
};

export const getPromoFilm = (state) => {
  return state[NAME_SPACE].promoFilm;
};

export const getCurrentGenre = (state) => {
  return state[NAME_SPACE].currentGenre;
};
