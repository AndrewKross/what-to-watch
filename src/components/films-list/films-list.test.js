import React from "react";
import renderer from "react-test-renderer";
import { films } from "../../test-mocks";
import { FilmsListComponent } from "./films-list.jsx";
import { FILMS_ON_START_SCREEN } from '../../const';

test(`FilmsList should render correctly`, () => {
  const tree = renderer
    .create(
      <FilmsListComponent
          filteredFilms={films}
          filmsOnScreen={FILMS_ON_START_SCREEN}
          onFilmCardClick={() => {}}
      />, {
        createNodeMock: () => ({}),
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
