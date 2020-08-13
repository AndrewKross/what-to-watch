import React from "react";
import PropTypes from "prop-types";

const Videoplayer = ({ preview, poster }) => {
  return (
    <video
      autoPlay={true}
      src={preview}
      muted={true}
      poster={poster}
      height={`100%`}
      width={`100%`}
    ></video>
  );
};

Videoplayer.propTypes = {
  preview: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default Videoplayer;
