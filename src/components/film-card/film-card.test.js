import React from "react";
import renderer from "react-test-renderer";
import { films } from "../../mocks/test-mocks";
import FilmCard from "./film-card.jsx";

const [film] = films;

test(`FilmCard should render correctly`, () => {
  const tree = renderer
    .create(
      <FilmCard
        filmData={film}
        onFilmCardHover={() => { }}
        onFilmCardClick={() => { }}
      />, {
        createNodeMock: () => ({}),
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
