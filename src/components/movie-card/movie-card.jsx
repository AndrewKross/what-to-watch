import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Videoplayer from "../videoplayer/videoplayer.jsx";

export default class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false
    };
  }

  render() {
    const {movieData, onMovieTitleClick, onMovieCardHover} = this.props;
    const {id, title, poster, trailer} = movieData;

    const renderVideoplayer = () => {
      return this.state.hovered ? <Videoplayer
        poster = {poster}
        trailer = {trailer} /> :
        <img src={poster} alt="${title}" width="280" height="175" />;
    };

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter = {() => {
          onMovieCardHover(id);
          this.setState({hovered: true});
        }}
        onMouseLeave = {() => {
          this.setState({hovered: false});
        }}>
        <div className="small-movie-card__image"
          onClick={(evt) => {
            evt.preventDefault();
            onMovieTitleClick(id);
          }}>
          {renderVideoplayer()}
        </div>
        <h3 className="small-movie-card__title"
          onClick={(evt) => {
            evt.preventDefault();
            onMovieTitleClick(id);
          }}>
          <a className="small-movie-card__link" href="movie-page.html">{title}</a>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    trailer: PropTypes.string.isRequired,
  }).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  onMovieCardHover: PropTypes.func.isRequired,
};
