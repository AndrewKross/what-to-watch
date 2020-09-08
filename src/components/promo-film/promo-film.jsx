import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { AppRoute } from '../../const';

const PromoFilm = ({
  promoFilmData: {
    title, genre, released, id, posterImage,
  },
  history,
}) => (
  <div className="movie-card__wrap">
    <div className="movie-card__info">
      <div className="movie-card__poster">
        <img
          src={posterImage}
          alt={title}
          width={218}
          height={327}
        />
      </div>

      <div className="movie-card__desc">
        <h2 className="movie-card__title">{title}</h2>
        <p className="movie-card__meta">
          <span className="movie-card__genre">{genre}</span>
          <span className="movie-card__year">{released}</span>
        </p>

        <div className="movie-card__buttons">
          <button className="btn btn--play movie-card__button" type="button" onClick={() => {
            history.push(AppRoute.PLAYER + id);
          }}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use href="#play-s"/>
            </svg>
            <span>Play</span></button>
          <button className="btn btn--list movie-card__button" type="button">
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use href="#add"/>
            </svg>
            <span>My list</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

PromoFilm.propTypes = {
  promoFilmData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    posterImage: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(PromoFilm);
