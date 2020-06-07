import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const moviesList = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

ReactDOM.render(
    <App
      moviesList = {moviesList} />,
    document.querySelector(`#root`)
);
