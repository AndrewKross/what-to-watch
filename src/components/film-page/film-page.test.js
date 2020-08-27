import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import FilmPage from "./film-page.jsx";
import { mockStore } from "../../test-mocks";

test(`FilmPage should render correctly`, () => {
  const mockStoreConfig = configureStore([]);
  const store = mockStoreConfig(mockStore);
  const tree = renderer
    .create(
        <Provider store={store}>
          <FilmPage
            selectedFilm={mockStore.filteredFilms[0]}
            films={mockStore.filteredFilms}
            onFilmCardClick={() => { }}
          />
        </Provider>, {
          createNodeMock: () => ({}),
        },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
