import * as React from 'react';
import {configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { ShowMoreComponent } from './show-more';

configure({adapter: new Adapter()});

const onShowMoreButtonClick = jest.fn();

test(`Click to show more button should cause incrementing of films counter`, () => {
  const showMoreButton = shallow(
    <ShowMoreComponent
      onShowMoreButtonClick={onShowMoreButtonClick}
    />,
  );

  const button = showMoreButton.find(`button`);

  button.simulate(`click`);

  expect(onShowMoreButtonClick.mock.calls.length).toBe(1);
});
