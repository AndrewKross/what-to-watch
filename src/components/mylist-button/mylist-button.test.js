import * as React from 'react';
import renderer from 'react-test-renderer';
import { MyListButtonComponent } from './mylist-button.tsx';
import { films } from '../../test-mocks';
import { noop } from '../../utils/common';

test(`MyListButton should render correctly`, () => {
  const tree = renderer.create(
    <MyListButtonComponent film={films[0]} changeFavoriteStatus={noop} isAuthorized={true} />, {
      createNodeMock: () => ({}),
    },
  )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
