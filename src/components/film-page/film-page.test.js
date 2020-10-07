import * as React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import history from '../../history';
import FilmPage from './film-page.tsx';
import { comments, defaultMockStore, films } from '../../test-mocks';
import { noop } from '../../utils/common';

test(`FilmPage should render correctly`, () => {
  const mockStoreConfig = configureStore([]);
  const store = mockStoreConfig(defaultMockStore);
  const tree = renderer.create(
    <Provider store={store}>
      <Router history={history}>
        <FilmPage films={films} loadComments={noop} selectedFilm={films[0]} comments={comments}
                  isAuthorized={true}/>
      </Router>
    </Provider>, {
      createNodeMock: () => ({}),
    },
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
