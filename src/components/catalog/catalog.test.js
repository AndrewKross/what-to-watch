import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { defaultMockStore, films } from "../../mocks/test-mocks";
import Catalog from "./catalog.jsx";
import { FILMS_COUNT_ON_START } from '../../const';

test(`Catalog should render correctly`, () => {
  const mockStoreConfig = configureStore([]);
  const store = mockStoreConfig(defaultMockStore);
  const tree = renderer.create(
      <Provider store={store}>
        <Catalog filmsOnScreen={FILMS_COUNT_ON_START} films={films} />
      </Provider>, {
        createNodeMock: () => ({}),
      },
  )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
