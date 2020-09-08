import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { formatVideoElapsed } from "../../utils/films";
import { AppRoute } from '../../const';

class MainPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      time: 0,
    };

    this._videoRef = React.createRef();
    this._progress = 0;
    this._duration = 0;
  }

  componentDidMount() {
    this._video = this._videoRef.current;

    this._video.onpause = () => {
      this._video.load();
      this.setState({ isPlaying: false });
      this._progress = 0;
    };

    this._video.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    this._video.play();
    this._video.oncanplaythrough = () => {
      this._duration = this._video.duration;
    };

    this._video.ontimeupdate = () => {
      this._progress = Math.ceil((this._video.currentTime / this._duration) * 100);
      this.setState({ time: Math.floor(this._video.currentTime) });
    };
  }

  componentWillUnmount() {
    this._video.onpause = null;
    this._video.src = ``;
    this._video.oncanplaythrough = null;
    this._video.onplay = null;
    this._video.ontimeupdate = null;
  }

  render() {
    const {
      videoMain, backgroundImage, title, id,
    } = this.props.film;

    const renderPlayButton = () => {
      if (this.state.isPlaying) {
        return (
            <button type="button" className="player__play" onClick={this._pauseVideo}>
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"/>
              </svg>
              <span>Pause</span>
            </button>
        );
      }
      return (
            <button type="button" className="player__play" onClick={this._playVideo}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"/>
              </svg>
              <span>Play</span>
            </button>
      );
    };

    return (
      <div className="player">
        <video className="player__video" ref={this._videoRef} src={videoMain} poster={backgroundImage}/>

        <button type="button" className="player__exit" onClick={
          () => this.props.history.push(AppRoute.FILM + id)
        }>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={this._progress} max="100"/>
              <div className="player__toggler" style={{ left: `${this._progress}%` }}>Toggler</div>
            </div>
            <div className="player__time-value">{formatVideoElapsed(this.state.time)}</div>
          </div>

          <div className="player__controls-row">

            {renderPlayButton()}

            <div className="player__name">{title}</div>

            <button type="button" className="player__full-screen" onClick={() => {
              this._video.requestFullscreen();
            }}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"/>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  _playVideo = () => {
    if (!this.state.isPlaying) {
      this._video.play();
      this.setState({ isPlaying: true });
    }
  }

  _pauseVideo = () => {
    if (this.state.isPlaying) {
      this._video.pause();
      this.setState({ isPlaying: false });
    }
  }
}

MainPlayer.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    videoMain: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(MainPlayer);
