import {
  reducer, initialState, ActionType, ActionCreator,
} from "./reducer";

describe(`Reducer should work correctly`, () => {
  const emptyState = {
    currentGenre: `All genres`,
    films: [],
    filteredFilms: [],
    filmsOnScreen: 8,
  };

  test(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test(`Reducer should change current genre by a given value`, () => {
    expect(reducer(emptyState, {
      type: ActionType.CHANGE_CURRENT_GENRE,
      payload: `Comedies`,
    })).toEqual({
      ...emptyState,
      currentGenre: `Comedies`,
    });
  });

  test(`Reducer should get movies according to the current genre`, () => {
    expect(reducer({
      ...emptyState,
      currentGenre: `Comedies`,
      films: [{ genre: `drama` }],
    }, {
      type: ActionType.CHANGE_CURRENT_GENRE,
      payload: `Dramas`,
    })).toEqual({
      ...emptyState,
      currentGenre: `Dramas`,
      films: [{ genre: `drama` }],
      filteredFilms: [{ genre: `drama` }],
    });
  });

  test(`Reducer should increment filmsOnScreen counter by 20`, () => {
    expect(reducer(emptyState, {
      type: ActionType.SHOW_MORE_FILMS,
    })).toEqual({
      ...emptyState,
      filmsOnScreen: 28,
    });
  });

  test(`Reducer should reset filmsOnScreen counter to default value when the genre has changed`, () => {
    expect(reducer({
      ...emptyState,
      filmsOnScreen: 28,
    }, {
      type: ActionType.CHANGE_CURRENT_GENRE,
      payload: `Drama`,
    })).toEqual({
      ...emptyState,
      currentGenre: `Drama`,
      filmsOnScreen: 8,
    });
  });
});

describe(`Action creators should work correctly`, () => {
  test(`changeCurrentGenre returns correct action`, () => {
    expect(ActionCreator.changeCurrentGenre(`Drama`)).toEqual({
      type: ActionType.CHANGE_CURRENT_GENRE,
      payload: `Drama`,
    });
  });

  test(`showMoreFilms returns correct action`, () => {
    expect(ActionCreator.showMoreFilms()).toEqual({
      type: ActionType.SHOW_MORE_FILMS,
    });
  });
});
