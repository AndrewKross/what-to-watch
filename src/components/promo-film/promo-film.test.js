import React from "react";
import renderer from "react-test-renderer";
import { PromoFilmData } from "../../mocks/test-mocks";
import PromoFilm from "./promo-film.jsx";

test(`PromoCard should render correctly`, () => {
  const tree = renderer
    .create(<PromoFilm promoFilmData={PromoFilmData} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
