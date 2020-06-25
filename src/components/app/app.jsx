import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MainPage from "../main-page/main-page.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

class App extends PureComponent {
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
    const {moviesList} = this.props;

    return <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {this._renderApp()}
        </Route>
        <Route exact path="/movie-page">
          <MoviePage selectedMovie={moviesList[0]}/>
        </Route>
      </Switch>
    </BrowserRouter>;
  }
}

App.propTypes = {
  moviesList: PropTypes.array.isRequired,
};

export default App;
