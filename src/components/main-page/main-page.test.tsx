import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { defaultMockStore, films } from '../../test-mocks';
import MainPage from './main-page';
import { FILMS_COUNT_ON_START } from '../../const';
import history from '../../history';

test(`MainPage should render correctly`, () => {
  const mockStoreConfig = configureStore([]);
  const store = mockStoreConfig(defaultMockStore);
  const tree = renderer.create(
    <Provider store={store}>
      <Router history={history}>
        <MainPage
          promoFilm={films[0]}
          filteredFilms={films}
          filmsOnScreen={FILMS_COUNT_ON_START}
        />
      </Router>
    </Provider>, {
      createNodeMock: () => ( {} ),
    },
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
