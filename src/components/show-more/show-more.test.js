import React from "react";
import renderer from "react-test-renderer";
import { ShowMoreComponent } from "./show-more.jsx";
import { noop } from '../../utils/common';

test(`ShowMore should render correctly`, () => {
  const tree = renderer
    .create(
      <ShowMoreComponent
          onShowMoreButtonClick={noop}
      />, {
        createNodeMock: () => ({}),
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
