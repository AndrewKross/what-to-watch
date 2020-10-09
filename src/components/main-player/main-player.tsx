import * as React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import history from '../../history';
import { Film } from '../../types';
import { formatVideoElapsed } from '../../utils/films';

interface Props {
  film: Film
}

interface State {
  isPlaying: boolean
  time: number
}

class MainPlayer extends Component<Props, State> {
  private readonly videoRef: React.RefObject<HTMLVideoElement>;
  private progress: number;
  private duration: number;
  private video: HTMLVideoElement;

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      time: 0,
    };

    this.videoRef = React.createRef();
    this.progress = 0;
    this.duration = 0;
  }

  componentDidMount() {
    this.video = this.videoRef.current;
    if (this.video.play) {
      this.video.play();
    }

    this.video.onpause = () => {
      this.video.load();
      this.setState({ isPlaying: false });
      this.progress = 0;
    };

    this.video.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    this.video.oncanplaythrough = () => {
      this.duration = this.video.duration;
    };

    this.video.ontimeupdate = () => {
      this.progress = Math.ceil((this.video.currentTime / this.duration) * 100);
      this.setState({ time: Math.floor(this.video.currentTime) });
    };
  }

  componentWillUnmount() {
    this.video.onpause = null;
    this.video.src = ``;
    this.video.oncanplaythrough = null;
    this.video.onplay = null;
    this.video.ontimeupdate = null;
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
        <video className="player__video" ref={this.videoRef}
               src={videoMain} poster={backgroundImage}/>

        <button type="button" className="player__exit" onClick={
          () => history.push(AppRoute.FILM + id)
        }>Exit
        </button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={this.progress} max="100"/>
              <div className="player__toggler" style={{ left: `${this.progress}%` }}>Toggler</div>
            </div>
            <div className="player__time-value">{formatVideoElapsed(this.state.time)}</div>
          </div>

          <div className="player__controls-row">

            {renderPlayButton()}

            <div className="player__name">{title}</div>

            <button type="button" className="player__full-screen" onClick={() => {
              this.video.requestFullscreen();
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
      this.video.play();
      this.setState({ isPlaying: true });
    }
  };

  _pauseVideo = () => {
    if (this.state.isPlaying) {
      this.video.pause();
      this.setState({ isPlaying: false });
    }
  };
}

export default withRouter(MainPlayer);
