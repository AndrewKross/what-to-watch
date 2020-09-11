const initialState = {
  isAuthorized: false,
};

const ActionType = {
  AUTHORIZE_USER: `AUTHORIZE_USER`,
};

const ActionCreator = {
  authorizeUser: () => ({
    type: ActionType.AUTHORIZE_USER,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHORIZE_USER:
      return {
        ...state,
        isAuthorized: true,
      };
    default: return state;
  }
};

export { reducer, ActionType, ActionCreator };
