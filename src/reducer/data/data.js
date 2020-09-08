import { filmsAdapter } from '../../adapters/film-adapter';

const initialState = {
  allFilms: [],
  promoFilm: {},
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
};

const ActionCreator = {
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
