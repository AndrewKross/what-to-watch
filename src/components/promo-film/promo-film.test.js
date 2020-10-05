import React from "react";
import renderer from "react-test-renderer";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { defaultMockStore, films } from '../../mocks/test-mocks';
import PromoFilm from "./promo-film.jsx";

test(`PromoCard should render correctly`, () => {
  const mockStoreConfig = configureStore([]);
  const store = mockStoreConfig(defaultMockStore);
  const tree = renderer
    .create(
      <Provider store={store}>
        <PromoFilm promoFilm={films[0]}/>
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
