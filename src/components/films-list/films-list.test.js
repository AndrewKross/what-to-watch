import React from "react";
import renderer from "react-test-renderer";
import { films } from "../../mocks/test-mocks";
import FilmsList from "./films-list.jsx";
import { FILMS_COUNT_ON_START } from '../../const';

test(`FilmsList should render correctly`, () => {
  const tree = renderer
    .create(
      <FilmsList
          filteredFilms={films}
          filmsOnScreen={FILMS_COUNT_ON_START}
          onFilmCardClick={() => {}}
      />, {
        createNodeMock: () => ({}),
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
