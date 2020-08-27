import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ShowMoreComponent } from "./show-more.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

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
