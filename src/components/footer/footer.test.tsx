import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Router } from 'react-router-dom';
import Footer from './footer';
import history from '../../history';

test(`Footer should render correctly`, () => {
  const tree = renderer.create(
    <Router history={history}>
      <Footer />
    </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
