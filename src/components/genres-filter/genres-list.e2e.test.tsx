import * as React from 'react';
import {configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { GenresFilterComponent } from './genres-filter';
import { films, GENRES } from '../../test-mocks';

configure({adapter: new Adapter()});

const onGenreChangeClick = jest.fn();

test(`Click to genres filter should change films genre`, () => {
  const genresFilter = shallow(
    <GenresFilterComponent
      currentGenre={GENRES[0]}
      films={films}
      onGenreChangeClick={onGenreChangeClick}
    />,
  );

  const buttons = genresFilter.find(`li`);

  buttons.forEach((btn) => btn.simulate(`click`));

  expect(onGenreChangeClick.mock.calls.length).toBe(GENRES.length);
});
