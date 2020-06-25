import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

it(`Should MoviesList render correctly`, () => {
  const tree = renderer
    .create(<MoviesList
      moviesList = {[{
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
      },
      {
        id: `film-2`,
        title: `War of the Worlds`,
        poster: `./img/war-of-the-worlds.jpg`,
        trailer: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
        genre: `Sci-Fi`,
        releaseYear: `2017`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        rating: `5,6`,
        votesCount: `278`,
        producer: `Wes Andreson`,
        actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
      },
      ]}
      onMovieCardClick = {() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
