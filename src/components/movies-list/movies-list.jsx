import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

export default class MoviesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {moviesList, onMovieCardClick} = this.props;
    return (
      <div className="catalog__movies-list">
        {moviesList.map((movieData) => (
          <MovieCard
            key={movieData.id}
            movieData = {movieData}
            onMovieCardClick = {onMovieCardClick}
          />
        ))}
      </div>
    );
  }
}

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};
