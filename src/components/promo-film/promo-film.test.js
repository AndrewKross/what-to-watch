import React from "react";
import renderer from "react-test-renderer";
import { films } from '../../mocks/test-mocks';
import PromoFilm from "./promo-film.jsx";

test(`PromoCard should render correctly`, () => {
  const tree = renderer
    .create(<PromoFilm promoFilm={films[0]}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
