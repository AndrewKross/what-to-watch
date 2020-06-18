import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

it(`Should MovieCard render correctly`, () => {
  const tree = renderer
    .create(<MovieCard
      movieData = {[{
        title: `Revenant`,
        src: `./img/revenant.jpg`,
        id: `1`,
      },
      {
        title: `War of the Worlds`,
        src: `./img/war-of-the-worlds.jpg`,
        id: `2`,
      },
      {
        title: `Snatch`,
        src: `./img/snatch.jpg`,
        id: `3`,
      }]}
      onMovieCardMouseOver = {() => {}}
      onMovieTitleClick = {() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
