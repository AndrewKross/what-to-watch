import React from "react";
import renderer from "react-test-renderer";
import { ShowMoreComponent } from "./show-more.jsx";

test(`ShowMore should render correctly`, () => {
  const tree = renderer
    .create(
      <ShowMoreComponent
          onShowMoreButtonClick={() => {}}
      />, {
        createNodeMock: () => ({}),
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
