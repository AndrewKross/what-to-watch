import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Videoplayer from "../videoplayer/videoplayer.jsx";

export default class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false
    };
  }

  render() {
    const {movieData, onMovieCardClick} = this.props;
    const {title, poster, trailer} = movieData;

    const renderVideoplayer = () => {
      return this.state.isHovered ? <Videoplayer
        poster = {poster}
        trailer = {trailer} /> :
        <img src={poster} alt="${title}" width="280" height="175" />;
    };

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter = {() => {
          this.setState({isHovered: true});
        }}
        onMouseLeave = {() => {
          this.setState({isHovered: false});
        }}>
        <div className="small-movie-card__image"
          onClick={() => onMovieCardClick(movieData)}>
          {renderVideoplayer()}
        </div>
        <h3 className="small-movie-card__title"
          onClick={(evt) => {
            evt.preventDefault();
            onMovieCardClick(movieData);
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
  onMovieCardClick: PropTypes.func.isRequired,
};
