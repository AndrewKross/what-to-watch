import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { AppRoute } from '../../const';
import Header from "../header/header.jsx";

const AddReview = ({
  film: {
    backgroundColor, backgroundImage, title, id, posterImage,
  },
}) => (
    <section className="movie-card movie-card--full" style={{ backgroundColor }}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={title}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header >
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.FILM + id} className="breadcrumbs__link">{title}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImage} alt="The Grand Budapest Hotel poster"
               width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2"/>
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3"
                     checked/>
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4"/>
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5"/>
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text" style={{ backgroundColor, filter: `brightness(1.1)` }}>
            <textarea className="add-review__textarea" name="review-text" id="review-text"
            placeholder="Review text"/>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
);

AddReview.propTypes = {
  film: PropTypes.shape({
    backgroundColor: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    posterImage: PropTypes.string.isRequired,
  }).isRequired,
};

export { AddReview };
