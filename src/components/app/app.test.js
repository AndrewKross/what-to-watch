import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { comments, defaultMockStore, films } from '../../mocks/test-mocks';
import { AppComponent } from './app.jsx';
import { noop } from '../../utils/common';
import { FILMS_COUNT_ON_START, HttpStatus } from '../../const';

const mockStoreConfig = configureStore([]);
const store = mockStoreConfig(defaultMockStore);

describe(`App Component`, () => {
  test(`should render correctly`, () => {
    const tree = renderer.create(
      <Provider store={store}>
        <AppComponent films={films} filmsOnScreen={FILMS_COUNT_ON_START} loadComments={noop}
                      isFilmsLoaded={true} isPromoFilmLoaded={true} promoFilm={films[0]}
                      requestStatus={HttpStatus.SUCCESS} filteredFilms={films}
                      comments={comments} isAuthorized={true}/>
      </Provider>, {
        createNodeMock: () => ({}),
      },
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test(`should render spinner, when loading films`, () => {
    const tree = renderer.create(
      <Provider store={store}>
        <AppComponent films={[]} filmsOnScreen={FILMS_COUNT_ON_START} loadComments={noop}
                      isFilmsLoaded={false} filteredFilms={[]} comments={[]} isAuthorized={true}
                      isPromoFilmLoaded={false} promoFilm={{}} requestStatus={HttpStatus.SUCCESS}/>
      </Provider>, {
        createNodeMock: () => ({}),
      },
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test(`should render error, if loading was failed`, () => {
    const tree = renderer.create(
      <Provider store={store}>
        <AppComponent films={[]} filmsOnScreen={FILMS_COUNT_ON_START} loadComments={noop}
                      isFilmsLoaded={true} filteredFilms={[]} comments={[]} isAuthorized={false}
                      isPromoFilmLoaded={true} promoFilm={{}} requestStatus={HttpStatus.NOT_FOUND}/>
      </Provider>, {
        createNodeMock: () => ({}),
      },
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
