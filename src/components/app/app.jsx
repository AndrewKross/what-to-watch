import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MainPage from "../main-page/main-page.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: null,
    };

    this.movieTitleClickHandler = this.movieTitleClickHandler.bind(this);
  }

  movieTitleClickHandler(id) {
    const selectedMovie = this.props.moviesList.filter((film) => film.id === id)[0];
    this.setState({selectedMovie});
  }

  render() {
    const {moviesList} = this.props;
    return (
      <MainPage
        moviesList = {moviesList}
        onMovieTitleClick = {this.movieTitleClickHandler} />
    );
  }
}

App.propTypes = {
  moviesList: PropTypes.array.isRequired,
};

export default App;
