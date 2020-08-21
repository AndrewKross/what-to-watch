import React from "react";
import renderer from "react-test-renderer";
import { PromoFilmData, films } from "../../test-mocks";
import MainPage from "./main-page.jsx";

test(`Main should render correctly`, () => {
  const tree = renderer
    .create(
      <MainPage
          promoFilmData={PromoFilmData}
          films={films}
          onFilmCardClick={() => {}}
      />, {
        createNodeMock: () => ({}),
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
