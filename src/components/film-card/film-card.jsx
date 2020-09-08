import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import PreviewPlayer from "../preview-player/preview-player.jsx";
import { PREVIEW_DELAY } from "../../const";

class FilmCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this._isCardHovered = false;
    this._playerTimeout = null;
  }

  render() {
    const { filmData } = this.props;
    const { title, previewImage, previewVideo } = filmData;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._onMouseEnterHandler}
        onMouseLeave={this._onMouseLeaveHandler}
        onClick={this._filmCardClickHandler}
      >
        <div className="small-movie-card__image">

          <PreviewPlayer
              previewImage={previewImage}
              previewVideo={previewVideo}
              isPlaying={this.state.isPlaying}
          />

        </div>

        <h3
          className="small-movie-card__title"
          onClick={(evt) => {
            evt.preventDefault();
            this._filmCardClickHandler();
          }}
        >
          <a className="small-movie-card__link">
            {title}
          </a>
        </h3>
      </article>
    );
  }

  _filmCardClickHandler = () => {
    this.props.history.push(`/film/${this.props.filmData.id}`);
  }

  componentWillUnmount() {
    clearTimeout(this._playerTimeout);
  }

  _onMouseEnterHandler = () => {
    this._isCardHovered = true;
    this._startPlaying();
  };

  _onMouseLeaveHandler = () => {
    this._isCardHovered = false;
    this._stopPlaying();
  };

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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideo: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(FilmCard);
