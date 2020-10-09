import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { films } from '../../test-mocks';
import FilmsList from './films-list';
import { FILMS_COUNT_ON_START } from '../../const';

test(`FilmsList should render correctly`, () => {
  const tree = renderer.create(
    <FilmsList
      films={films}
      filmsOnScreen={FILMS_COUNT_ON_START}
    />, {
      createNodeMock: () => ( {} ),
    },
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
