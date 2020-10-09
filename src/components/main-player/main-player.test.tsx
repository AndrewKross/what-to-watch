import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Router } from 'react-router-dom';
import { films } from '../../test-mocks';
import MainPlayer from './main-player';
import history from '../../history';

test(`MainPlayer should render correctly`, () => {
  const tree = renderer.create(
    <Router history={history}>
      <MainPlayer film={films[0]}/>
    </Router>, {
      createNodeMock: () => ( {} ),
    },
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
