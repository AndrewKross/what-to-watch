import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import moviesData from "./mocks/movies.js";

ReactDOM.render(
    <App
      moviesList = {moviesData} />,
    document.querySelector(`#root`)
);
