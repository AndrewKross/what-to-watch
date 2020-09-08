import { FILMS_ON_SHOW_MORE_BUTTON, FILMS_COUNT_ON_START } from '../../const';

const initialState = {
  filmsOnScreen: FILMS_COUNT_ON_START,
  currentGenre: `All genres`,
};

const ActionType = {
  SHOW_MORE_FILMS: `SHOW_MORE_FILMS`,
  RESET_SHOWING_FILMS_COUNT: `RESET_SHOWING_FILMS_COUNT`,
  CHANGE_CURRENT_GENRE: `CHANGE_CURRENT_GENRE`,
};

const ActionCreator = {
  changeCurrentGenre: (genre) => ({
    type: ActionType.CHANGE_CURRENT_GENRE,
    payload: genre,
  }),
  showMoreFilms: () => ({
    type: ActionType.SHOW_MORE_FILMS,
  }),
  resetShowingFilmsCount: () => ({
    type: ActionType.RESET_SHOWING_FILMS_COUNT,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CURRENT_GENRE:
      return {
        ...state,
        currentGenre: action.payload,
      };
    case ActionType.SHOW_MORE_FILMS:
      return {
        ...state,
        filmsOnScreen: state.filmsOnScreen + FILMS_ON_SHOW_MORE_BUTTON,
      };
    case ActionType.RESET_SHOWING_FILMS_COUNT:
      return {
        ...state,
        filmsOnScreen: FILMS_COUNT_ON_START,
      };
    default:
      return { ...state };
  }
};

export { ActionType, ActionCreator, reducer };
