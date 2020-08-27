import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { GENRES } from "../../const";
import { GenresFilterComponent } from "./genres-filter.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const onGenreChangeClick = jest.fn();

test(`Click to genres filter should change films genre`, () => {
  const genresFilter = shallow(
      <GenresFilterComponent
          currentGenre={GENRES[0]}
          onGenreChangeClick={onGenreChangeClick}
      />,
  );

  const buttons = genresFilter.find(`li`);

  buttons.forEach((btn) => btn.simulate(`click`));

  expect(onGenreChangeClick.mock.calls.length).toBe(GENRES.length);
});
