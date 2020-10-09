import { nanoid } from 'nanoid';
import * as React from 'react';
import { Component } from 'react';

interface Props {
  previewVideo: string;
  previewImage: string;
  isPlaying: boolean;
}

export default class PreviewPlayer extends Component<Props, null> {
  private readonly videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props: Props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount(): void {
    const { isPlaying } = this.props;
    const video = this.videoRef.current;

    if (isPlaying) {
      video.play();
    }
  }

  componentWillUnmount(): void {
    const video = this.videoRef.current;

    video.onpause = null;
    video.src = ``;
  }

  componentDidUpdate(): void {
    const { isPlaying } = this.props;
    const video = this.videoRef.current;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }

  render(): React.ReactNode {
    const { previewVideo, previewImage } = this.props;

    return (
      <video
        key={nanoid(5)}
        ref={this.videoRef}
        src={previewVideo}
        width={280}
        height={175}
        poster={previewImage}
        muted
      />
    );
  }
}
