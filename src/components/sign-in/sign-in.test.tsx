import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { defaultMockStore } from '../../test-mocks';
import SignIn from './sign-in';
import history from '../../history';

test(`SignIn should render correctly`, () => {
  const mockStoreConfig = configureStore([]);
  const store = mockStoreConfig(defaultMockStore);
  const tree = renderer.create(
    <Provider store={store}>
      <Router history={history}>
        <SignIn/>
      </Router>
    </Provider>, {
      createNodeMock: () => ( {} ),
    },
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
