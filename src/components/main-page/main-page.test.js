import React from "react";
import renderer from "react-test-renderer";
import MainPage from "./main-page.jsx";

it(`Should MainPage render correctly`, () => {
  const tree = renderer
    .create(<MainPage
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
