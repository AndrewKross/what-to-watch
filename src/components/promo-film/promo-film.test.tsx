import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { defaultMockStore, films } from '../../test-mocks';
import PromoFilm from './promo-film';

test(`PromoCard should render correctly`, () => {
  const mockStoreConfig = configureStore([]);
  const store = mockStoreConfig(defaultMockStore);
  const tree = renderer.create(
    <Provider store={store}>
      <PromoFilm promoFilm={films[0]}/>
    </Provider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
