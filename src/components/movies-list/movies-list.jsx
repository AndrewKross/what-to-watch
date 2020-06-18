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
    return (
      <div className="catalog__movies-list">
        {moviesList.map((movieData) => (
          <MovieCard
            key={movieData.id}
            movieData = {movieData}
            onMovieCardHover = {this._movieCardActiveHandler}
            onMovieTitleClick = {onMovieTitleClick}
          />
        ))}
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
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
};
