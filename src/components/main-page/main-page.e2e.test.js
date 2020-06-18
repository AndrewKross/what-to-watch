import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MainPage from "./main-page.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie title be pressed`, () => {
  const onMovieTitleClick = jest.fn();

  const mainPage = shallow(
      <MainPage
        moviesList = {[{
          title: `Revenant`,
          src: `./img/revenant.jpg`,
          id: `1`,
        },
        {
          title: `War of the Worlds`,
          src: `./img/war-of-the-worlds.jpg`,
          id: `2`,
        },
        {
          title: `Snatch`,
          src: `./img/snatch.jpg`,
          id: `3`,
        }]}
        onMovieTitleClick = {onMovieTitleClick}
      />
  );

  const movieTitles = mainPage.find(`.small-movie-card__title`);

  movieTitles.forEach((title) => title.props().onClick());

  expect(onMovieTitleClick.mock.calls.length).toBe(movieTitles.length);
});
