import React from "react";
import renderer from "react-test-renderer";
import PreviewPlayer from "./preview-player.jsx";
import { films } from "../../mocks/test-mocks";

const [film] = films;
const { preview, cover } = film;

test(`VideoPlayer should render correctly`, () => {
  const tree = renderer
    .create(
      <PreviewPlayer
          preview={preview}
          cover={cover}
          isPlaying={false}
      />, {
        createNodeMock: () => ({}),
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
