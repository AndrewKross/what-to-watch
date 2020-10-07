import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../api';
import {
  initialState, reducer, ActionType, ActionCreator, Operation,
} from "./user";
import { imgURL, LoadingStatus } from '../../const';
import {
  loginData, userData,
} from '../../test-mocks';

const api = createAPI(() => {});

describe(`User Reducer`, () => {
  test(`without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test(`should authorize user`, () => {
    expect(reducer({
      ...initialState,
      isAuthorized: false,
    }, {
      type: ActionType.AUTHORIZE_USER,
      payload: true,
    })).toEqual({
      ...initialState,
      isAuthorized: true,
    });
  });

  test(`should set user info`, () => {
    expect(reducer({
      ...initialState,
      userInfo: {},
    }, {
      type: ActionType.SET_USER_INFO,
      payload: userData,
    })).toEqual({
      ...initialState,
      userInfo: userData,
    });
  });

  test(`should change review loading status`, () => {
    expect(reducer({
      ...initialState,
      reviewLoadingStatus: LoadingStatus.PENDING,
    }, {
      type: ActionType.CHANGE_REVIEW_LOADING_STATUS,
      payload: LoadingStatus.OK,
    })).toEqual({
      ...initialState,
      reviewLoadingStatus: LoadingStatus.OK,
    });
  });

  test(`should change authorization loading status`, () => {
    expect(reducer({
      ...initialState,
      authorizationLoadingStatus: LoadingStatus.PENDING,
    }, {
      type: ActionType.CHANGE_AUTH_LOADING_STATUS,
      payload: LoadingStatus.OK,
    })).toEqual({
      ...initialState,
      authorizationLoadingStatus: LoadingStatus.OK,
    });
  });
});

describe(`User Action creator`, () => {
  test(`authorizeUser returns correct action`, () => {
    expect(ActionCreator.authorizeUser(true)).toEqual({
      type: ActionType.AUTHORIZE_USER,
      payload: true,
    });
  });

  test(`setUserInfo returns correct action`, () => {
    expect(ActionCreator.setUserInfo(userData)).toEqual({
      type: ActionType.SET_USER_INFO,
      payload: userData,
    });
  });

  test(`changeReviewLoadingStatus returns correct action`, () => {
    expect(ActionCreator.changeReviewLoadingStatus(LoadingStatus.OK)).toEqual({
      type: ActionType.CHANGE_REVIEW_LOADING_STATUS,
      payload: LoadingStatus.OK,
    });
  });

  test(`changeAuthLoadingStatus returns correct action`, () => {
    expect(ActionCreator.changeAuthLoadingStatus(LoadingStatus.OK)).toEqual({
      type: ActionType.CHANGE_AUTH_LOADING_STATUS,
      payload: LoadingStatus.OK,
    });
  });
});

describe(`User Operation`, () => {
  test(`should make a correct API call to /login (post)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loginLoader = Operation.loginUser(loginData);

    apiMock.onPost(`/login`).reply(200, userData);

    return loginLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_AUTH_LOADING_STATUS,
        payload: LoadingStatus.SENDING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_AUTH_LOADING_STATUS,
        payload: LoadingStatus.OK,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.SET_USER_INFO,
        payload: { ...userData, avatar: `${imgURL}undefined` },
      });
      expect(dispatch).toHaveBeenNthCalledWith(4, {
        type: ActionType.AUTHORIZE_USER,
        payload: true,
      });
    });
  });
});
