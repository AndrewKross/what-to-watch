import { userAdapter } from '../../adapters/user-adapter';
import { AuthorizationStatus, LoadingStatus } from '../../const';
import { convertCommentsFromServer } from '../../adapters/comments-adapter';
import { ActionCreator as DataActionCreator } from '../data/data';

const initialState = {
  isAuthorized: AuthorizationStatus.NOT_AUTHORIZED,
  userInfo: {},
  reviewLoadingStatus: LoadingStatus.PENDING,
  authorizationLoadingStatus: LoadingStatus.PENDING,
};

const ActionType = {
  AUTHORIZE_USER: `AUTHORIZE_USER`,
  SET_USER_INFO: `SET_USER_INFO`,
  CHANGE_REVIEW_STATUS: `CHANGE_REVIEW_STATUS`,
  CHANGE_AUTH_STATUS: `CHANGE_AUTH_STATUS`,
};

const ActionCreator = {
  authorizeUser: (status) => ({
    type: ActionType.AUTHORIZE_USER,
    payload: status,
  }),
  setUserInfo: (user) => ({
    type: ActionType.SET_USER_INFO,
    payload: user,
  }),
  changeReviewStatus: (status) => ({
    type: ActionType.CHANGE_REVIEW_STATUS,
    payload: status,
  }),
  changeAuthorizationLoadingStatus: (status) => ({
    type: ActionType.CHANGE_AUTH_STATUS,
    payload: status,
  }),
};

const Operation = {
  loginUser: (userEmail, userPassword) => (dispatch, getState, api) => {
    dispatch(ActionCreator.changeAuthorizationLoadingStatus(LoadingStatus.SENDING));

    return api.post(`/login`, {
      email: userEmail,
      password: userPassword,
    })
      .then((response) => {
        const user = userAdapter(response.data);

        dispatch(ActionCreator.changeAuthorizationLoadingStatus(LoadingStatus.OK));
        dispatch(ActionCreator.setUserInfo(user));
        dispatch(ActionCreator.authorizeUser(AuthorizationStatus.AUTHORIZED));
      })
      .catch(() => {
        dispatch(ActionCreator.changeAuthorizationLoadingStatus(LoadingStatus.ERROR));
      });
  },
  checkAuthorizationStatus: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.changeAuthorizationLoadingStatus(LoadingStatus.SENDING));

    return api.get(`/login`)
      .then((response) => {
        const user = userAdapter(response.data);

        dispatch(ActionCreator.changeAuthorizationLoadingStatus(LoadingStatus.OK));
        dispatch(ActionCreator.setUserInfo(user));
        dispatch(ActionCreator.authorizeUser(AuthorizationStatus.AUTHORIZED));
      })
      .catch(() => {
        dispatch(ActionCreator.changeAuthorizationLoadingStatus(LoadingStatus.ERROR));
      });
  },
  sendReview: (review, filmId) => (dispatch, getState, api) => {
    dispatch(ActionCreator.changeReviewStatus(LoadingStatus.SENDING));

    return api.post(`/comments/${filmId}`, {
      rating: review.rating,
      comment: review.comment,
    })
      .then((response) => {
        const adaptedComments = convertCommentsFromServer(response.data);

        dispatch(ActionCreator.changeReviewStatus(LoadingStatus.OK));
        dispatch(DataActionCreator.loadComments(adaptedComments));
      })
      .catch(() => {
        dispatch(ActionCreator.changeReviewStatus(LoadingStatus.ERROR));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHORIZE_USER:
      return {
        ...state,
        isAuthorized: action.payload,
      };
    case ActionType.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case ActionType.CHANGE_REVIEW_STATUS:
      return {
        ...state,
        reviewLoadingStatus: action.payload,
      };
    case ActionType.CHANGE_AUTH_STATUS:
      return {
        ...state,
        authorizationLoadingStatus: action.payload,
      };
    default: return state;
  }
};

export {
  reducer, ActionType, ActionCreator, Operation,
};
