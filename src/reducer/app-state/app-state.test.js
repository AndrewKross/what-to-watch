import {
  reducer, initialState, ActionType, ActionCreator,
} from "./app-state";
import { FILMS_COUNT_ON_START } from '../../const';

describe(`App-state Reducer`, () => {
  test(`without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test(`should change current genre by a given value`, () => {
    expect(reducer({
      ...initialState,
      currentGenre: `All genres`,
    }, {
      type: ActionType.CHANGE_CURRENT_GENRE,
      payload: `Comedies`,
    })).toEqual({
      ...initialState,
      currentGenre: `Comedies`,
    });
  });

  test(`should increment filmsOnScreen counter by 20`, () => {
    expect(reducer({
      ...initialState,
      filmsOnScreen: 8,
    }, {
      type: ActionType.SHOW_MORE_FILMS,
    })).toEqual({
      ...initialState,
      filmsOnScreen: 28,
    });
  });

  test(`should reset films counter to default value`, () => {
    expect(reducer({
      ...initialState,
      filmsOnScreen: 28,
    }, {
      type: ActionType.RESET_SHOWING_FILMS_COUNT,
    })).toEqual({
      ...initialState,
      filmsOnScreen: FILMS_COUNT_ON_START,
    });
  });
});

describe(`App-state Action creator`, () => {
  test(`changeCurrentGenre returns correct action`, () => {
    expect(ActionCreator.changeCurrentGenre(`Drama`)).toEqual({
      type: ActionType.CHANGE_CURRENT_GENRE,
      payload: `Drama`,
    });
  });

  test(`resetShowingFilmsCount returns correct action`, () => {
    expect(ActionCreator.resetShowingFilmsCount()).toEqual({
      type: ActionType.RESET_SHOWING_FILMS_COUNT,
    });
  });

  test(`showMoreFilms returns correct action`, () => {
    expect(ActionCreator.showMoreFilms()).toEqual({
      type: ActionType.SHOW_MORE_FILMS,
    });
  });
});
