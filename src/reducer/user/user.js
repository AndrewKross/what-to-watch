import { userAdapter } from '../../adapters/user-adapter';

const initialState = {
  isAuthorized: false,
  userInfo: null,
};

const ActionType = {
  AUTHORIZE_USER: `AUTHORIZE_USER`,
  SET_USER_INFO: `SET_USER_INFO`,
};

const ActionCreator = {
  authorizeUser: () => ({
    type: ActionType.AUTHORIZE_USER,
  }),
  setUserInfo: (user) => ({
    type: ActionType.SET_USER_INFO,
    payload: user,
  }),
};

const Operation = {
  loginUser: (userEmail, userPassword) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: userEmail,
      password: userPassword,
    })
      .then((response) => {
        const user = userAdapter(response.data);

        dispatch(ActionCreator.setUserInfo(user));
        dispatch(ActionCreator.authorizeUser());
      })
      .catch((err) => {
        throw err;
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
    default: return state;
  }
};

export {
  reducer, ActionType, ActionCreator, Operation,
};
