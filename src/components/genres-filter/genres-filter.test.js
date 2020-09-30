import React from "react";
import renderer from "react-test-renderer";
import { GenresFilterComponent } from "./genres-filter.jsx";
import { DEFAULT_GENRE } from '../../const';
import { films } from '../../mocks/test-mocks';
import { noop } from '../../utils/common';

test(`GenresFilter should render correctly`, () => {
  const tree = renderer
    .create(
      <GenresFilterComponent
          currentGenre={DEFAULT_GENRE}
          films={films}
          onGenreChangeClick={noop}
      />, {
        createNodeMock: () => ({}),
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
