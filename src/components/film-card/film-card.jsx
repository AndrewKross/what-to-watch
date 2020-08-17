import React, { Component } from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import { PREVIEW_DELAY } from "../../const";

export default class FilmCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this._isCardHovered = false;
    this._playerTimeout = null;
  }

  render() {
    const { filmData, onFilmCardClick, onCardHover } = this.props;
    const { title, cover, preview } = filmData;

    const onMouseEnterHandler = (evt) => {
      this._isCardHovered = true;
      onCardHover(filmData, evt.target);
      this._startPlaying();
    };

    const onMouseLeaveHandler = () => {
      this._isCardHovered = false;
      this._stopPlaying();
    };

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <div className="small-movie-card__image" onClick={() => onFilmCardClick(filmData)}>
          <VideoPlayer cover={cover} preview={preview} isPlaying={this.state.isPlaying} />
        </div>

        <h3
          className="small-movie-card__title"
          onClick={(evt) => {
            evt.preventDefault();
            onFilmCardClick(filmData);
          }}
        >
          <a className="small-movie-card__link" href="film-page.html">
            {title}
          </a>
        </h3>
      </article>
    );
  }

  componentWillUnmount() {
    clearTimeout(this._playerTimeout);
  }

  _startPlaying() {
    this._playerTimeout = setTimeout(() => {
      if (this._isCardHovered === true) {
        this.setState({
          isPlaying: true,
        });
      }
    }, PREVIEW_DELAY);
  }

  _stopPlaying() {
    clearTimeout(this._playerTimeout);
    this.setState({
      isPlaying: false,
    });
  }
}

FilmCard.propTypes = {
  filmData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratingsCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string),
    runTime: PropTypes.number.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
      }),
    ).isRequired,
  }).isRequired,
  onFilmCardClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
};
