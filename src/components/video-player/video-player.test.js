import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player.jsx";
import { films } from "../../test-mocks";

const [film] = films;
const { preview, cover } = film;

test(`VideoPlayer should render correctly`, () => {
  const tree = renderer
    .create(
      <VideoPlayer
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
