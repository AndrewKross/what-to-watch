import React from "react";
import renderer from "react-test-renderer";
import { GENRES } from "../../const";
import { GenresFilterComponent } from "./genres-filter.jsx";

test(`GenresFilter should render correctly`, () => {
  const tree = renderer
    .create(
      <GenresFilterComponent
          currentGenre={GENRES[0]}
          onGenreChangeClick={() => {}}
      />, {
        createNodeMock: () => ({}),
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
