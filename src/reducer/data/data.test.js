import MockAdapter from 'axios-mock-adapter';
import { ActionCreator, ActionType, initialState, Operation, reducer } from './data';
import { comments, films } from '../../test-mocks';
import { createAPI } from '../../api';

const api = createAPI(() => {});

describe(`Data Reducer`, () => {
  test(`without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test(`should load films`, () => {
    expect(reducer({
      ...initialState,
      films: [],
    }, {
      type: ActionType.LOAD_FILMS,
      payload: films,
    })).toEqual({
      ...initialState,
      films,
    });
  });

  test(`should load comments`, () => {
    expect(reducer({
      ...initialState,
      comments: [],
    }, {
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    })).toEqual({
      ...initialState,
      comments,
    });
  });

  test(`should change comments load state`, () => {
    expect(reducer({
      ...initialState,
      isCommentsLoaded: false,
    }, {
      type: ActionType.CHANGE_COMMENTS_LOAD_STATE,
      payload: true,
    })).toEqual({
      ...initialState,
      isCommentsLoaded: true,
    });
  });

  test(`should change films load state`, () => {
    expect(reducer({
      ...initialState,
      isFilmsLoaded: false,
    }, {
      type: ActionType.CHANGE_FILMS_LOAD_STATE,
    })).toEqual({
      ...initialState,
      isFilmsLoaded: true,
    });
  });

  test(`should update films`, () => {
    expect(reducer({
      ...initialState,
      films: [],
    }, {
      type: ActionType.UPDATE_FILMS,
      payload: films,
    })).toEqual({
      ...initialState,
      films,
    });
  });
});

describe(`Data Action creator`, () => {
  test(`changeCommentsLoadState returns correct action`, () => {
    expect(ActionCreator.changeCommentsLoadState(true)).toEqual({
      type: ActionType.CHANGE_COMMENTS_LOAD_STATE,
      payload: true,
    });
  });

  test(`changeFilmsLoadState returns correct action`, () => {
    expect(ActionCreator.changeFilmsLoadState()).toEqual({
      type: ActionType.CHANGE_FILMS_LOAD_STATE,
    });
  });

  test(`loadComments returns correct action`, () => {
    expect(ActionCreator.loadComments(comments)).toEqual({
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    });
  });

  test(`loadFilms returns correct action`, () => {
    expect(ActionCreator.loadFilms(films)).toEqual({
      type: ActionType.LOAD_FILMS,
      payload: films,
    });
  });

  test(`updateFilms returns correct action`, () => {
    expect(ActionCreator.updateFilms(films)).toEqual({
      type: ActionType.UPDATE_FILMS,
      payload: films,
    });
  });
});

describe(`Data Operation`, () => {
  test(`should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operation.loadFilms();

    apiMock.onGet(`/films`).reply(200, []);

    return filmsLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_FILMS,
        payload: [],
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_FILMS_LOAD_STATE,
      });
    });
  });

  test(`should make a correct API call to /comments:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = Operation.loadComments(films[0].id);

    apiMock.onGet(`/comments/0`).reply(200, []);

    return commentsLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_COMMENTS,
        payload: [],
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_COMMENTS_LOAD_STATE,
        payload: true,
      });
    });
  });
});
