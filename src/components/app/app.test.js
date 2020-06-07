import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      moviesList = {[`First title`, `Second title`, `Third title`]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
