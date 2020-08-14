import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Videoplayer from "../videoplayer/videoplayer.jsx";
import { PREVIEW_DELAY } from "../../cosnt.js"

export default class FilmCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false,
    };
  }

  render() {
    const { filmData, onFilmCardClick } = this.props;
    const { title, cover, preview } = filmData;

    let timeoutHandler;
    const onMouseEnterHandler = () => {
      timeoutHandler = setTimeout(() => {
        this.setState({ isHovered: true });
      }, PREVIEW_DELAY);
    };

    const renderVideoplayer = () => {
      return this.state.isHovered ? (
        <Videoplayer cover={cover} preview={preview} />
      ) : (
          <img src={cover} alt="${title}" width="280" height="175" />
        );
    };

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={() => {
          this.setState({ isHovered: false });
          clearTimeout(timeoutHandler);
        }}
      >
        <div
          className="small-movie-card__image"
          onClick={() => onFilmCardClick(filmData)}
        >
          {renderVideoplayer()}
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
