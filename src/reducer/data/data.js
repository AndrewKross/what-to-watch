import { filmsAdapter } from '../../adapters/film-adapter';
import { getFilteredFilmsByGenre } from '../../utils/films';

const initialState = {
  allFilms: [],
  currentGenre: `All genres`,
  filteredFilms: [],
  promoFilm: {},
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  CHANGE_CURRENT_GENRE: `CHANGE_CURRENT_GENRE`,
};

const ActionCreator = {
  changeCurrentGenre: (genre) => ({
    type: ActionType.CHANGE_CURRENT_GENRE,
    payload: genre,
  }),
  loadFilms: (loadedFilms) => ({
    type: ActionType.LOAD_FILMS,
    payload: loadedFilms,
  }),
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const films = filmsAdapter(response.data);
        dispatch(ActionCreator.loadFilms(films));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CURRENT_GENRE:
      return {
        ...state,
        currentGenre: action.payload,
        filteredFilms: getFilteredFilmsByGenre(state.allFilms, action.payload),
      };
    case ActionType.LOAD_FILMS:
      return {
        ...state,
        allFilms: action.payload,
        filteredFilms: action.payload,
        promoFilm: action.payload[0],
      };
    default: return state;
  }
};

export {
  ActionCreator, ActionType, reducer, Operation,
};
