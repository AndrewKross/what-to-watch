import { NameSpace } from "../reducer";

const NAME_SPACE = NameSpace.DATA;

export const getFilms = (state) => {
  return state[NAME_SPACE].allFilms;
};

export const getPromoFilm = (state) => {
  return state[NAME_SPACE].promoFilm;
};

export const getComments = (state) => {
  return state[NAME_SPACE].comments;
};
