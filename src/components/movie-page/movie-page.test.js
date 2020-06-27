import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";

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
  director: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  runTime: `1h 35m`,
};

it(`Should MoviePage render correctly`, () => {
  const tree = renderer
    .create(<MoviePage
      selectedMovie = {mockMovie}
      onMovieCardClick = {() => {}}
      moviesList = {[mockMovie]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
