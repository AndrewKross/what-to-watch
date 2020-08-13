import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmCard from "./film-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockFilm = {
  id: `film-1`,
  title: `Revenant`,
  poster: `./img/revenant.jpg`,
  preview: `https://download.blender.org/durian/preview/sintel_preview-480p.mp4`,
  genre: `Action`,
  release: `2017`,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  rating: `5,6`,
  votesCount: `278`,
  producer: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
};

it(`Film card should send correct data when clicked`, () => {
  const onFilmCardClick = jest.fn();

  const filmCard = shallow(
    <FilmCard filmData={mockFilm} onFilmCardClick={onFilmCardClick} />
  );

  const cardImg = filmCard.find(`.small-movie-card__image`);

  cardImg.simulate(`click`);

  expect(onFilmCardClick).toHaveBeenCalledWith(mockFilm);
});

it(`State should change to "true" when mouse hover the card and to "false" when mouse leave the card`, () => {
  const filmCard = shallow(
    <filmCard filmData={mockFilm} onFilmCardClick={() => {}} />
  );

  const cardNode = filmCard.find(`article`);

  jest.useFakeTimers();

  expect(filmCard.state(`isHovered`)).toBe(false); // проверяем дефолтный стейт

  cardNode.simulate(`mouseEnter`); // наводимся мышкой

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500); // проверяем, запустился ли таймер

  expect(filmCard.state(`isHovered`)).toBe(false); // проверяем что таймер еще идет и стейт не изменился

  jest.runOnlyPendingTimers(); // проматываем таймер

  expect(filmCard.state(`isHovered`)).toBe(true); // и проверяем что стейт изменился

  cardNode.simulate(`mouseLeave`);
  expect(filmCard.state(`isHovered`)).toBe(false);
});
