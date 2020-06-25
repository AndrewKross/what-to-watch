import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MainPage from "../main-page/main-page.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: null,
    };

    this.movieTitleClickHandler = this.movieTitleClickHandler.bind(this);
  }

  movieTitleClickHandler(selectedMovie) {
    this.setState({selectedMovie});
  }

  _renderApp() {
    const {moviesList} = this.props;

    if (this.state.selectedMovie) {
      return (
        <MoviePage
          selectedMovie = {this.state.selectedMovie} />
      );
    }

    return (
      <MainPage
        moviesList = {moviesList}
        onMovieCardClick = {this.movieTitleClickHandler} />
    );
  }

  render() {
    return this._renderApp();
  }
}

App.propTypes = {
  moviesList: PropTypes.array.isRequired,
};
