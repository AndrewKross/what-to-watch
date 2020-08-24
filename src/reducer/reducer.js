import { GENRES } from "../const";
import films from "../mocks/films";
import { getFilteredFilmsByGenre } from "../utils/films";

const initialState = {
  currentGenre: GENRES[0],
  films,
};

const ActionType = {
  CHANGE_CURRENT_GENRE: `CHANGE_CURRENT_GENRE`,
  FILTER_FILMS_BY_GENRE: `FILTER_FILMS_BY_GENRE`,
};

const ActionCreator = {
  changeCurrentGenre: (genre) => ({
    type: ActionType.CHANGE_CURRENT_GENRE,
    payload: genre,
  }),
  filterFilmsByGenre: () => ({
    type: ActionType.FILTER_FILMS_BY_GENRE,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CURRENT_GENRE:
      return {
        ...state,
        currentGenre: action.payload,
        films: getFilteredFilmsByGenre(initialState.films, action.payload),
      };
    case ActionType.FILTER_FILMS_BY_GENRE:
      return { ...state, films: getFilteredFilmsByGenre(initialState.films, state.currentGenre) };
    default:
      return { ...state };
  }
};

export { reducer, ActionCreator };
