import { NameSpace } from "../reducer";

const NAME_SPACE = NameSpace.USER;

// eslint-disable-next-line import/prefer-default-export
export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].isAuthorized;
};
