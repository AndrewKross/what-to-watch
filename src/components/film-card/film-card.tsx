import * as React from 'react';
import { Component } from 'react';
import history from '../../history';
import PreviewPlayer from '../preview-player/preview-player';
import { AppRoute, PREVIEW_DELAY } from '../../const';
import { Film } from '../../types';

interface Props {
  filmData: Film;
}

interface State {
  isPlaying: boolean;
}

class FilmCard extends Component<Props, State> {
  private _isCardHovered: boolean;
  private _playerTimeout: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this._isCardHovered = false;
    this._playerTimeout = null;
  }

  componentWillUnmount(): void {
    clearTimeout(this._playerTimeout);
  }

  render(): React.ReactNode {
    const { filmData } = this.props;
    const { title, previewImage, previewVideo } = filmData;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        onClick={this._handleFilmCardClick}
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
            this._handleFilmCardClick();
          }}
        >
          <a href="#" className="small-movie-card__link">
            {title}
          </a>
        </h3>
      </article>
    );
  }

  _handleFilmCardClick = (): void => {
    history.push(`${AppRoute.FILM + this.props.filmData.id}`);
  };

  _handleMouseEnter = (): void => {
    this._isCardHovered = true;
    this._startPlaying();
  };

  _handleMouseLeave = (): void => {
    this._isCardHovered = false;
    this._stopPlaying();
  };

  _startPlaying(): void {
    this._playerTimeout = setTimeout(() => {
      if (this._isCardHovered === true) {
        this.setState({
          isPlaying: true,
        });
      }
    }, PREVIEW_DELAY);
  }

  _stopPlaying(): void {
    clearTimeout(this._playerTimeout);
    this.setState({
      isPlaying: false,
    });
  }
}

export default FilmCard;
