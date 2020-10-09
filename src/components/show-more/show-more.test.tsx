import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ShowMoreComponent } from './show-more';
import { noop } from '../../utils/common';

test(`ShowMore should render correctly`, () => {
  const tree = renderer.create(
    <ShowMoreComponent
      onShowMoreButtonClick={noop}
    />, {
      createNodeMock: () => ( {} ),
    },
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
