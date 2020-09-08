import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mockStore } from "../../mocks/test-mocks";
import Catalog from "./catalog.jsx";

test(`Catalog should render correctly`, () => {
  const mockStoreConfig = configureStore([]);
  const store = mockStoreConfig(mockStore);
  const tree = renderer.create(
      <Provider store={store}>
        <Catalog
          onFilmCardClick={() => { }}
        />
      </Provider>, {
        createNodeMock: () => ({}),
      },
  )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
