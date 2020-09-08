import { NameSpace } from "../reducer";

const NAME_SPACE = NameSpace.APP_STATE;

export const getFilmsOnScreen = (state) => {
  return state[NAME_SPACE].filmsOnScreen;
};
