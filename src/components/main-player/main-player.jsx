import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class MainPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this._videoRef = React.createRef();
  }

  componentDidMount() {
    this._video = this._videoRef.current;

    this._video.onpause = () => {
      this._video.load();
    };

    this._video.play();
    if (!this._video.paused) {
      this.setState({ isPlaying: true });
    }
  }

  componentWillUnmount() {
    this._video.onpause = null;
    this._video.src = ``;
  }

  render() {
    const { preview, cover } = this.props.film;

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
        <video className="player__video" ref={this._videoRef} src={preview} poster={cover}/>

        <button type="button" className="player__exit" onClick={this.props.history.goBack}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"/>
              <div className="player__toggler" style={{ left: `30%` }}>Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>

          <div className="player__controls-row">

            {renderPlayButton()}

            <div className="player__name">Transpotting</div>

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
    preview: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(MainPlayer);
