import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

export default class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cardOnFocus: null,
    };

    this._movieCardActiveHandler = this._movieCardActiveHandler.bind(this);
  }

  render() {
    const {moviesList, onMovieTitleClick} = this.props;

    const moviesMarkup = moviesList.map((movie) => {
      return <MovieCard
        key = {movie.id}
        movieData = {movie}
        onMovieCardMouseOver = {this._movieCardActiveHandler}
        onMovieTitleClick = {onMovieTitleClick}
      />;
    });

    return (
      <div className="catalog__movies-list">
        {moviesMarkup}
      </div>
    );
  }

  _movieCardActiveHandler(id) {
    this.setState({
      cardOnFocus: this.props.moviesList.filter((movie) => id === movie.id)
    });
  }
}


MoviesList.propTypes = {
  moviesList: PropTypes.array.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
};
