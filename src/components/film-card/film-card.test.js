import * as React from 'react';
import renderer from 'react-test-renderer';
import { films } from '../../test-mocks';
import FilmCard from './film-card.tsx';

test(`FilmCard should render correctly`, () => {
  const tree = renderer.create(
      <FilmCard
        filmData={films[0]}
      />, {
        createNodeMock: () => ({}),
      },
  )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
