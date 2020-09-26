import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { createAPI } from './api';
import { Operation as DataOperation } from './reducer/data/data';
import { Operation as UserOperation, ActionCreator as UserActionCreator } from './reducer/user/user';
import reducer from './reducer/reducer';
import App from "./components/app/app.jsx";
import { AuthorizationStatus } from './const';

const onUnauthorized = () => {
  store.dispatch(UserActionCreator
    .authorizeUser(AuthorizationStatus.NOT_AUTHORIZED));
};

const api = createAPI(onUnauthorized);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

store.dispatch(DataOperation.loadFilms());
store.dispatch(UserOperation.checkAuthorizationStatus());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.querySelector(`#root`),
);
