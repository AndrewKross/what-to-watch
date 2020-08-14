import React from "react";
import PropTypes from "prop-types";

const Videoplayer = ({ preview, cover }) => {
  return (
    <video
      autoPlay={true}
      src={preview}
      muted={true}
      cover={cover}
      height={`100%`}
      width={`100%`}
    ></video>
  );
};

Videoplayer.propTypes = {
  preview: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
};

export default Videoplayer;
