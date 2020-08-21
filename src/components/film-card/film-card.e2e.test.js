import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { films } from "../../test-mocks";
import FilmCard from "./film-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const [film] = films;
const onFilmCardHover = jest.fn();
const onFilmCardClick = jest.fn();

jest.useFakeTimers();

describe(`Testing FilmCard component`, () => {
  let filmCard = null;

  beforeEach(() => {
    filmCard = shallow(
        <FilmCard
            filmData={film}
            onFilmCardHover={onFilmCardHover}
            onFilmCardClick={onFilmCardClick}
        />,
    );
  });

  test(`Film info should be pass in arguments after hover`, () => {
    filmCard.simulate(`mouseenter`, { target: {} });
    expect(onFilmCardHover.mock.calls[0][0]).toMatchObject(film);
  });

  test(`Film info should be pass in arguments after click`, () => {
    filmCard.simulate(`click`);
    expect(onFilmCardClick.mock.calls[0][0]).toMatchObject(film);
  });

  test(`Playing state should be pass to VideoPlayer`, () => {
    filmCard.simulate(`mouseenter`, { target: {} });
    jest.runAllTimers();
    expect(filmCard.state().isPlaying).toBeTruthy();

    filmCard.simulate(`mouseleave`);
    expect(filmCard.state().isPlaying).toBeFalsy();
  });
});
