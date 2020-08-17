import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player.jsx";

it(`Should VideoPlayer render correctly`, () => {
  const tree = renderer
    .create(
      <VideoPlayer
        poster={`./img/war-of-the-worlds.jpg`}
        preview={`https://download.blender.org/durian/preview/sintel_preview-480p.mp4`}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
