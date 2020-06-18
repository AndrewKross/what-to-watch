import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

it(`Should MoviesList render correctly`, () => {
  const tree = renderer
    .create(<MoviesList
      moviesList = {[{
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
      onMovieTitleClick = {() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
