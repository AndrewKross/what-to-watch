import React from "react";
import PropTypes from "prop-types";

const Videoplayer = ({trailer, poster}) => {
  return (
    <video
      autoPlay={true}
      src={trailer}
      muted={true}
      poster={poster}
      height={`100%`} width={`100%`}>
    </video>
  );
};

Videoplayer.propTypes = {
  trailer: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default Videoplayer;
