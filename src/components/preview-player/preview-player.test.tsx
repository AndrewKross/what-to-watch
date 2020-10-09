import * as React from 'react';
import * as renderer from 'react-test-renderer';
import PreviewPlayer from './preview-player';
import { films } from '../../test-mocks';

const [film] = films;
const { previewVideo, previewImage } = film;

test(`VideoPlayer should render correctly`, () => {
  const tree = renderer.create(
    <PreviewPlayer
      isPlaying={false} previewImage={previewImage} previewVideo={previewVideo}/>, {
      createNodeMock: () => ( {} ),
    },
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
