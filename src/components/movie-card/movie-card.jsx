import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export default class MovieCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movieData, onMovieTitleClick, onMovieCardHover} = this.props;
    const {id, title, src} = movieData;

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter = {() => {
          onMovieCardHover(id);
        }}>
        <div className="small-movie-card__image">
          <img src={src} alt="${title}" width="280" height="175" />
        </div>
        <h3 onClick={onMovieTitleClick} className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{title}</a>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  onMovieCardHover: PropTypes.func.isRequired,
};
