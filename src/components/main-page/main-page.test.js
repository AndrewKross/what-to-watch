import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from 'react-redux';
import { PromoFilmData, mockStore } from "../../mocks/test-mocks";
import MainPage from "./main-page.jsx";

test(`Main should render correctly`, () => {
  const mockStoreConfig = configureStore([]);
  const store = mockStoreConfig(mockStore);
  const tree = renderer
    .create(
        <Provider store={store}>
          <MainPage
              promoFilmData={PromoFilmData}
              films={mockStore.filteredFilms}
              filmsOnScreen={mockStore.filmsOnScreen}
          />
        </Provider>, {
          createNodeMock: () => ({}),
        },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
