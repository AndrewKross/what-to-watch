import { NameSpace } from '../reducer';

const NAME_SPACE = NameSpace.DATA;

export const getFilms = (state) => state[NAME_SPACE].films;
export const getPromoFilm = (state) => state[NAME_SPACE].promoFilm;
export const getComments = (state) => state[NAME_SPACE].comments;
export const getFilmsLoadingStatus = (state) => state[NAME_SPACE].isFilmsLoaded;
export const getRequestStatus = (state) => state[NAME_SPACE].requestStatus;
export const getPromoFilmLoadState = (state) => state[NAME_SPACE].promoFilmLoadState;
