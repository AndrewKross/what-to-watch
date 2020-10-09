import { userAdapter } from '../../adapters/user-adapter';
import { AuthorizationStatus, HttpStatus, LoadingStatus } from '../../const';
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
  CHANGE_REVIEW_LOADING_STATUS: `CHANGE_REVIEW_LOADING_STATUS`,
  CHANGE_AUTH_LOADING_STATUS: `CHANGE_AUTH_LOADING_STATUS`,
};

const ActionCreator = {
  authorizeUser: (status) => ( {
    type: ActionType.AUTHORIZE_USER,
    payload: status,
  } ),
  setUserInfo: (user) => ( {
    type: ActionType.SET_USER_INFO,
    payload: user,
  } ),
  changeReviewLoadingStatus: (status) => ( {
    type: ActionType.CHANGE_REVIEW_LOADING_STATUS,
    payload: status,
  } ),
  changeAuthLoadingStatus: (status) => ( {
    type: ActionType.CHANGE_AUTH_LOADING_STATUS,
    payload: status,
  } ),
};

const Operation = {
  loginUser: (userEmail, userPassword) => (dispatch, getState, api) => {
    dispatch(ActionCreator.changeAuthLoadingStatus(LoadingStatus.SENDING));

    return api.post(`/login`, {
      email: userEmail,
      password: userPassword,
    }).then((response) => {
      const user = userAdapter(response.data);

      dispatch(ActionCreator.changeAuthLoadingStatus(LoadingStatus.OK));
      dispatch(ActionCreator.setUserInfo(user));
      dispatch(ActionCreator.authorizeUser(AuthorizationStatus.AUTHORIZED));
    }).catch(() => {
      dispatch(ActionCreator.changeAuthLoadingStatus(LoadingStatus.ERROR));
    });
  },
  checkAuthorizationStatus: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.changeAuthLoadingStatus(LoadingStatus.SENDING));

    return api.get(`/login`).then((response) => {
      const user = userAdapter(response.data);

      dispatch(ActionCreator.changeAuthLoadingStatus(LoadingStatus.OK));
      dispatch(ActionCreator.setUserInfo(user));
      dispatch(ActionCreator.authorizeUser(AuthorizationStatus.AUTHORIZED));
    }).catch((err) => {
      if (err.response.status !== HttpStatus.UNAUTHORIZED) {
        dispatch(ActionCreator.changeAuthLoadingStatus(LoadingStatus.ERROR));
      }
      dispatch(ActionCreator.changeAuthLoadingStatus(LoadingStatus.OK));
    });
  },
  logoutUser: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.changeAuthLoadingStatus(LoadingStatus.SENDING));

    return api.get(`/logout`).then(() => {
      dispatch(ActionCreator.changeAuthLoadingStatus(LoadingStatus.OK));
      dispatch(ActionCreator.authorizeUser(AuthorizationStatus.NOT_AUTHORIZED));
    }).catch((err) => {
      if (err.response.status !== HttpStatus.UNAUTHORIZED) {
        dispatch(ActionCreator.changeAuthLoadingStatus(LoadingStatus.ERROR));
      }
      dispatch(ActionCreator.changeAuthLoadingStatus(LoadingStatus.OK));
    });
  },
  sendReview: (review, filmId) => (dispatch, getState, api) => {
    dispatch(ActionCreator.changeReviewLoadingStatus(LoadingStatus.SENDING));

    return api.post(`/comments/${filmId}`, {
      rating: review.rating,
      comment: review.comment,
    }).then((response) => {
      const adaptedComments = convertCommentsFromServer(response.data);

      dispatch(ActionCreator.changeReviewLoadingStatus(LoadingStatus.OK));
      dispatch(DataActionCreator.loadComments(adaptedComments));
    }).catch(() => {
      dispatch(ActionCreator.changeReviewLoadingStatus(LoadingStatus.ERROR));
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
    case ActionType.CHANGE_REVIEW_LOADING_STATUS:
      return {
        ...state,
        reviewLoadingStatus: action.payload,
      };
    case ActionType.CHANGE_AUTH_LOADING_STATUS:
      return {
        ...state,
        authorizationLoadingStatus: action.payload,
      };
    default:
      return state;
  }
};

export {
  reducer, ActionType, ActionCreator, Operation, initialState,
};
