import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockMovie = {
  id: `film-1`,
  title: `Revenant`,
  poster: `./img/revenant.jpg`,
  trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Action`,
  releaseYear: `2017`,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  rating: `5,6`,
  votesCount: `278`,
  producer: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
};

it(`Movie card should send correct data when clicked`, () => {
  const onMovieCardClick = jest.fn();

  const expectedData = {
    id: `film-1`,
    title: `Revenant`,
    poster: `./img/revenant.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Action`,
    releaseYear: `2017`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    rating: `5,6`,
    votesCount: `278`,
    producer: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  };

  const movieCard = shallow(
      <MovieCard
        movieData = {mockMovie}
        onMovieCardClick = {onMovieCardClick}
      />
  );

  const cardImg = movieCard.find(`.small-movie-card__image`);

  cardImg.simulate(`click`);

  expect(onMovieCardClick).toHaveBeenCalledWith(expectedData);
});
