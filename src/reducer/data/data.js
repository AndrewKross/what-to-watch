import history from "../../history";
import { filmAdapter, filmsAdapter } from '../../adapters/film-adapter';
import { convertCommentsFromServer } from '../../adapters/comments-adapter';
import { AppRoute, HttpStatus } from '../../const';

const initialState = {
  films: [],
  comments: [],
  isFilmsLoaded: false,
  isCommentsLoaded: false,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  CHANGE_COMMENTS_LOAD_STATE: `CHANGE_COMMENTS_LOAD_STATE`,
  CHANGE_FILMS_LOAD_STATE: `CHANGE_FILMS_LOAD_STATE`,
  UPDATE_FILMS: `UPDATE_FILMS`,
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
  updateFilms: (films) => ({
    type: ActionType.UPDATE_FILMS,
    payload: films,
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
  changeFavoriteStatus: (filmId, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${filmId}/${status}`)
      .then((response) => {
        const adaptedFilm = filmAdapter(response.data);
        const { DATA: { films } } = getState();
        const updatedFilmIndex = films.findIndex((film) => film.id === filmId);

        films[updatedFilmIndex] = adaptedFilm;
        dispatch(ActionCreator.updateFilms([...films]));
      })
      .catch((error) => {
        if (error.response.status === HttpStatus.UNAUTHORIZED) {
          history.push(AppRoute.LOGIN);
        }
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return {
        ...state,
        films: action.payload,
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
    case ActionType.UPDATE_FILMS:
      return {
        ...state,
        films: action.payload,
      };
    default: return state;
  }
};

export {
  ActionCreator, ActionType, reducer, Operation,
};
