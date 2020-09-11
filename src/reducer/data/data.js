import { filmsAdapter } from '../../adapters/film-adapter';
import { convertCommentsFromServer } from '../../adapters/comments-adapter';

const initialState = {
  allFilms: [],
  promoFilm: {},
  comments: [],
  isFilmsLoaded: false,
  isCommentsLoaded: false,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  CHANGE_COMMENTS_LOAD_STATE: `CHANGE_COMMENTS_LOAD_STATE`,
  CHANGE_FILMS_LOAD_STATE: `CHANGE_FILMS_LOAD_STATE`,
};

const ActionCreator = {
  loadFilms: (loadedFilms) => ({
    type: ActionType.LOAD_FILMS,
    payload: loadedFilms,
  }),
  loadComments: (loadedComments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: loadedComments,
  }),
  changeCommentsLoadState: (bool) => ({
    type: ActionType.CHANGE_COMMENTS_LOAD_STATE,
    payload: bool,
  }),
  changeFilmsLoadState: () => ({
    type: ActionType.CHANGE_FILMS_LOAD_STATE,
  }),
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const films = filmsAdapter(response.data);
        dispatch(ActionCreator.loadFilms(films));
        dispatch(ActionCreator.changeFilmsLoadState());
      });
  },
  loadComments: (filmId) => (dispatch, getState, api) => {
    return api.get(`/comments/${filmId}`)
      .then((response) => {
        const adaptedComments = convertCommentsFromServer(response.data);
        dispatch(ActionCreator.loadComments(adaptedComments));
        dispatch(ActionCreator.changeCommentsLoadState(true));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return {
        ...state,
        allFilms: action.payload,
        promoFilm: action.payload[0],
      };
    case ActionType.LOAD_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case ActionType.CHANGE_COMMENTS_LOAD_STATE:
      return {
        ...state,
        isCommentsLoaded: action.payload,
      };
    case ActionType.CHANGE_FILMS_LOAD_STATE:
      return {
        ...state,
        isFilmsLoaded: true,
      };
    default: return state;
  }
};

export {
  ActionCreator, ActionType, reducer, Operation,
};
