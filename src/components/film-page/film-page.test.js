import React from "react";
import renderer from "react-test-renderer";
import { films } from "../../test-mocks";
import FilmPage from "./film-page.jsx";

const [film] = films;

test(`FilmPage should render correctly`, () => {
  const tree = renderer
    .create(
      <FilmPage
        selectedFilm={film}
        films={films}
        onFilmCardClick={() => { }}
      />, {
        createNodeMock: () => ({}),
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
