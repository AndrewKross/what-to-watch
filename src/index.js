import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./reducer/reducer.js";
import App from "./components/app/app.jsx";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

const promoFilmData = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  date: `2014`,
};

ReactDOM.render(
  <Provider store={store}>
    <App promoFilmData={promoFilmData} />
  </Provider>,
  document.querySelector(`#root`)
);
