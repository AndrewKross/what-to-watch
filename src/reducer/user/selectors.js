import { NameSpace } from "../reducer";

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].isAuthorized;
};

export const getUserInfo = (state) => {
  return state[NAME_SPACE].userInfo;
};
