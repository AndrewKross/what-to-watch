import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { AddReviewComponent } from './add-review';
import { noop } from '../../utils/common';
import history from '../../history';
import { defaultMockStore, films } from '../../test-mocks';
import { LoadingStatus } from '../../const';

test(`AddReview should render correctly`, () => {
  const mockStoreConfig = configureStore([]);
  const store = mockStoreConfig(defaultMockStore);
  const tree = renderer.create(
    <Provider store={store}>
      <Router history={history}>
        <AddReviewComponent sendReview={noop} film={films[0]}
                            resetReviewLoadingStatus={noop} reviewStatus={LoadingStatus.PENDING}/>
      </Router>
    </Provider>, {
      createNodeMock: () => ( {} ),
    },
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
