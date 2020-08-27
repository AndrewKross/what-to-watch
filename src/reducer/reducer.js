import { FILMS_ON_SHOW_MORE_BUTTON, FILMS_ON_START_SCREEN, GENRES } from '../const';
import films from "../mocks/films";
import { getFilteredFilmsByGenre } from "../utils/films";

const initialState = {
  currentGenre: GENRES[0],
  allFilms: films,
  filteredFilms: films,
  filmsOnScreen: FILMS_ON_START_SCREEN,
};

const ActionType = {
  CHANGE_CURRENT_GENRE: `CHANGE_CURRENT_GENRE`,
  FILTER_FILMS_BY_GENRE: `FILTER_FILMS_BY_GENRE`,
  SHOW_MORE_FILMS: `SHOW_MORE_FILMS`,
};

const ActionCreator = {
  changeCurrentGenre: (genre) => ({
    type: ActionType.CHANGE_CURRENT_GENRE,
    payload: genre,
  }),
  filterFilmsByGenre: () => ({
    type: ActionType.FILTER_FILMS_BY_GENRE,
  }),
  showMoreFilms: () => ({
    type: ActionType.SHOW_MORE_FILMS,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CURRENT_GENRE:
      return {
        ...state,
        currentGenre: action.payload,
        filteredFilms: getFilteredFilmsByGenre(initialState.filteredFilms, action.payload),
        filmsOnScreen: initialState.filmsOnScreen,
      };
    case ActionType.FILTER_FILMS_BY_GENRE:
      return {
        ...state,
        filteredFilms: getFilteredFilmsByGenre(initialState.filteredFilms, state.currentGenre),
      };
    case ActionType.SHOW_MORE_FILMS:
      return {
        ...state,
        filmsOnScreen: state.filmsOnScreen + FILMS_ON_SHOW_MORE_BUTTON,
      };
    default:
      return { ...state };
  }
};

export { reducer, ActionCreator };
