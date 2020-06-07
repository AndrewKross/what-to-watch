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
        moviesList = {[`First title`, `Second title`, `Third title`]}
        onMovieTitleClick = {onMovieTitleClick}
      />
  );

  const movieTitles = mainPage.find(`.small-movie-card__title`);

  movieTitles.forEach((title) => title.props().onClick());

  expect(onMovieTitleClick.mock.calls.length).toBe(movieTitles.length);
});
