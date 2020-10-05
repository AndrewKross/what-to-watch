import React from "react";
import renderer from "react-test-renderer";
import Error from "./error.jsx";
import { HttpStatus } from '../../const';

test(`Error should render correctly`, () => {
  const tree = renderer.create(
    <Error
      requestStatus={HttpStatus.NOT_FOUND}
    />, {
      createNodeMock: () => ({}),
    },
  )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
