import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { PromoFilmData, films, mockStore } from "../../test-mocks";
import { AppComponent } from "./app.jsx";

test(`App should render correctly`, () => {
  const mockStoreConfig = configureStore([]);
  const store = mockStoreConfig(mockStore);
  const tree = renderer
    .create(
        <Provider store={store}>
          <AppComponent
            promoFilmData={PromoFilmData}
            filmsData={films}
          />
        </Provider>, {
          createNodeMock: () => ({}),
        },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
