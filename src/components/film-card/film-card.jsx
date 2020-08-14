import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import { PREVIEW_DELAY } from "../../cosnt.js";

export default class FilmCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this._isCardHovered = false;
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
        <div
          className="small-movie-card__image"
          onClick={() => onFilmCardClick(filmData)}
        >
          <VideoPlayer
            cover={cover}
            preview={preview}
            isPlaying={this.state.isPlaying}
          />
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

  _startPlaying() {
    setTimeout(() => {
      if (this._isCardHovered === true) {
        this.setState({
          isPlaying: true,
        });
      }
    }, PREVIEW_DELAY);
  }

  _stopPlaying() {
    this.setState({
      isPlaying: false,
    });
  }
}

FilmCard.propTypes = {
  filmData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  onFilmCardClick: PropTypes.func.isRequired,
};
