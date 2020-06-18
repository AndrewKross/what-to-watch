import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

it(`Should MovieCard render correctly`, () => {
  const tree = renderer
    .create(<MovieCard
      movieData = {{
        title: `Revenant`,
        src: `./img/revenant.jpg`,
        id: `1`,
      }}
      onMovieCardHover = {() => {}}
      onMovieTitleClick = {() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
