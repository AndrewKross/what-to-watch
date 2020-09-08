import { combineReducers } from "redux";
import { reducer as data } from "./data/data";
import { reducer as appState } from "./app-state/app-state";
import { reducer as user } from "./user/user";

export const NameSpace = {
  APP_STATE: `APP_STATE`,
  DATA: `DATA`,
  USER: `USER`,
};

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.APP_STATE]: appState,
  [NameSpace.USER]: user,
});
