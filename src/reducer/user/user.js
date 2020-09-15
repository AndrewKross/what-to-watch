import { userAdapter } from '../../adapters/user-adapter';
import { LoadingStatus } from '../../const';
import { convertCommentsFromServer } from '../../adapters/comments-adapter';
import { ActionCreator as DataActionCreator } from '../data/data';

const initialState = {
  isAuthorized: false,
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
  authorizeUser: () => ({
    type: ActionType.AUTHORIZE_USER,
  }),
  setUserInfo: (user) => ({
    type: ActionType.SET_USER_INFO,
    payload: user,
  }),
  changeReviewStatus: (status) => ({
    type: ActionType.CHANGE_REVIEW_STATUS,
    payload: status,
  }),
  changeAuthorizationStatus: (status) => ({
    type: ActionType.CHANGE_AUTH_STATUS,
    payload: status,
  }),
};

const Operation = {
  loginUser: (userEmail, userPassword) => (dispatch, getState, api) => {
    dispatch(ActionCreator.changeAuthorizationStatus(LoadingStatus.SENDING));

    return api.post(`/login`, {
      email: userEmail,
      password: userPassword,
    })
      .then((response) => {
        const user = userAdapter(response.data);

        dispatch(ActionCreator.changeAuthorizationStatus(LoadingStatus.OK));
        dispatch(ActionCreator.setUserInfo(user));
        dispatch(ActionCreator.authorizeUser());
      })
      .catch(() => {
        dispatch(ActionCreator.changeAuthorizationStatus(LoadingStatus.ERROR));
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
        isAuthorized: true,
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
