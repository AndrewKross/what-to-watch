import React from "react";
import renderer from "react-test-renderer";
import Header from "./header.jsx";

test(`Header should render correctly`, () => {
  const tree = renderer
    .create(<Header />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
