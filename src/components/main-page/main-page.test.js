import React from "react";
import renderer from "react-test-renderer";
import MainPage from "./main-page.jsx";

it(`Should MainPage render correctly`, () => {
  const tree = renderer
    .create(<MainPage
      moviesList = {[`First title`, `Second title`, `Third title`]}
      onMovieTitleClick = {() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
