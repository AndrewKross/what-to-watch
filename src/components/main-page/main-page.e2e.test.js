import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MainPage from "./main-page.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie title be pressed`, () => {
  const onMovieCardClick = jest.fn();

  const mainPage = shallow(
      <MainPage
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
        onMovieCardClick = {onMovieCardClick}
      />
  );

  const cardNode = mainPage.find(`article`);

  cardNode.forEach((img) => img.simulate(`click`));

  expect(onMovieCardClick.mock.calls.length).toBe(cardNode.length);
});
