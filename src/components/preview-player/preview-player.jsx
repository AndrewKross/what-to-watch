import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PreviewPlayer extends Component {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
  }

  componentDidMount() {
    const { isPlaying } = this.props;
    const video = this._videoRef.current;

    video.onpause = () => {
      video.load();
    };

    if (isPlaying) {
      video.play();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.onpause = null;
    video.src = ``;
  }

  componentDidUpdate() {
    const { isPlaying } = this.props;
    const video = this._videoRef.current;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }

  render() {
    const { previewVideo, previewImage } = this.props;

    return (
      <video
        key={Math.random()}
        ref={this._videoRef}
        src={previewVideo}
        width={280}
        height={175}
        poster={previewImage}
        muted
      />
    );
  }
}

PreviewPlayer.propTypes = {
  previewVideo: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};
