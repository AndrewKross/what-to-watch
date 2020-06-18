import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockMovie = {
  title: `Revenant`,
  src: `./img/revenant.jpg`,
  id: `1`,
};

it(`Movie card should send correct id when hovered`, () => {
  const onMovieCardHover = jest.fn();
  const onMovieTitleClick = jest.fn();
  const {id} = mockMovie;

  const movieCard = shallow(
      <MovieCard
        movieData = {mockMovie}
        onMovieCardHover = {onMovieCardHover}
        onMovieTitleClick = {onMovieTitleClick}
      />
  );

  const cardNode = movieCard.find(`article`);

  cardNode.simulate(`mouseEnter`);

  expect(onMovieCardHover).toHaveBeenCalledWith(id);
});
