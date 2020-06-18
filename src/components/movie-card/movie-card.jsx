import React from "react";
import PropTypes from "prop-types";

const MovieCard = ({movieData, onMovieTitleClick, onMovieCardMouseOver}) => {
  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseOver = {() => {
        onMovieCardMouseOver(movieData.id);
      }}>
      <div className="small-movie-card__image">
        <img src={movieData.src} alt="${movieData.title}" width="280" height="175" />
      </div>
      <h3 onClick={onMovieTitleClick} className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{movieData.title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  onMovieCardMouseOver: PropTypes.func.isRequired,
};

export default MovieCard;
