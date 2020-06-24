import React from "react";
import renderer from "react-test-renderer";
import Videoplayer from "./videoplayer.jsx";

it(`Should Videoplayer render correctly`, () => {
  const tree = renderer
    .create(<Videoplayer
      poster = {`./img/war-of-the-worlds.jpg`}
      trailer = {`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
