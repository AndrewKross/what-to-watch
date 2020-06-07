import React from "react";
import PropTypes from "prop-types";
import MainPage from "../main-page/main-page.jsx";

const movieTitleClickHandler = () => {};

const App = (props) => {
  const {moviesList} = props;

  return (
    <MainPage
      moviesList = {moviesList}
      onMovieTitleClick = {movieTitleClickHandler} />
  );
};

App.propTypes = {
  moviesList: PropTypes.array.isRequired,
};

export default App;
