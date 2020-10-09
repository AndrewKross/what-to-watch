import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Header from './header';
import { defaultMockStore } from '../../test-mocks';
import history from '../../history';

test(`Header should render correctly`, () => {
  const mockStoreConfig = configureStore([]);
  const store = mockStoreConfig(defaultMockStore);
  const tree = renderer.create(
    <Provider store={store}>
      <Router history={history}>
        <Header/>
      </Router>
    </Provider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
