import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createAPI } from './api';
import App from './components/app/app';
import { AuthorizationStatus } from './const';
import {
  ActionCreator as DataActionCreator,
  Operation as DataOperation,
} from './reducer/data/data';
import reducer from './reducer/reducer';
import {
  ActionCreator as UserActionCreator,
  Operation as UserOperation,
} from './reducer/user/user';

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.authorizeUser(AuthorizationStatus.NOT_AUTHORIZED));
};

const onError = (error) => {
  store.dispatch(DataActionCreator.changeRequestStatus(error.response.status));
};

const api = createAPI(onUnauthorized, onError);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

store.dispatch(DataOperation.loadFilms());
store.dispatch(DataOperation.loadPromoFilm());
store.dispatch(UserOperation.checkAuthorizationStatus());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Provider>,
  document.querySelector(`#root`),
);
