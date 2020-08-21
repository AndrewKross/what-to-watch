import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./reducer/reducer";
import App from "./components/app/app.jsx";
import filmsData from "./mocks/films";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const promoFilmData = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  date: `2014`,
};

ReactDOM.render(
  <Provider store={store}>
    <App
      promoFilmData={promoFilmData}
      filmsData={filmsData}
    />
  </Provider>,
  document.querySelector(`#root`),
);
