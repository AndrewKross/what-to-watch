import React from "react";
import renderer from "react-test-renderer";
import { films } from "../../mocks/test-mocks";
import FilmCard from "./film-card.jsx";

test(`FilmCard should render correctly`, () => {
  const tree = renderer.create(
      <FilmCard
        filmData={films[0]}
      />, {
        createNodeMock: () => ({}),
      },
  )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
