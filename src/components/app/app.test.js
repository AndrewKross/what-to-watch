import React from "react";
import renderer from "react-test-renderer";
import { PromoFilmData, films } from "../../test-mocks";
import App from "./app.jsx";

test(`App should render correctly`, () => {
  const tree = renderer
    .create(
      <App
        promoFilmData={PromoFilmData}
        filmsData={films}
      />, {
        createNodeMock: () => ({}),
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
