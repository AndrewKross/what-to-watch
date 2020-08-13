import React from "react";
import renderer from "react-test-renderer";
import Videoplayer from "./videoplayer.jsx";

it(`Should Videoplayer render correctly`, () => {
  const tree = renderer
    .create(
      <Videoplayer
        poster={`./img/war-of-the-worlds.jpg`}
        preview={`https://download.blender.org/durian/preview/sintel_preview-480p.mp4`}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
