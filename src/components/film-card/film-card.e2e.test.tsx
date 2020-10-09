import * as React from 'react';
import {configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { films } from '../../test-mocks';
import FilmCard from './film-card';

configure({adapter: new Adapter()});

const [film] = films;

jest.useFakeTimers();

describe(`Testing FilmCard component`, () => {
  let filmCard = null;

  beforeEach(() => {
    filmCard = shallow(
      <FilmCard
        filmData={film}
      />,
    );
  });

  test(`Playing state should be pass to VideoPlayer`, () => {
    filmCard.simulate(`mouseenter`, { target: {} });
    jest.runAllTimers();
    expect(filmCard.state().isPlaying).toBeTruthy();

    filmCard.simulate(`mouseleave`);
    expect(filmCard.state().isPlaying).toBeFalsy();
  });
});
