import React, { useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { AppRoute, LoadingStatus } from '../../const';
import Header from "../header/header.jsx";
import { getReviewLoadingStatus } from '../../reducer/user/selectors';
import { ActionCreator as UserActionCreator, Operation as UserOperation } from '../../reducer/user/user';

const AddReview = ({
  film: {
    backgroundColor, backgroundImage, title, id, posterImage,
  },
  reviewStatus, sendReview, history, resetReviewLoadingStatus,
}) => {
  let ratingValue = `3`;
  const textRef = useRef(``);
  const changeRating = (rating) => { ratingValue = rating; };
  const submitReviewHandler = (evt) => {
    evt.preventDefault();
    sendReview({
      rating: ratingValue,
      comment: textRef.current.value,
    }, id);
  };

  useEffect(() => {
    if (reviewStatus === LoadingStatus.OK) {
      history.push(AppRoute.FILM + id);
    }
    return () => resetReviewLoadingStatus();
  });

  return (
      <section className="movie-card movie-card--full" style={{ backgroundColor }}>
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={title}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header>
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
          <form action="#" className="add-review__form" onSubmit={submitReviewHandler}>
            <div className="rating">
              <div className="rating__stars">
                {new Array(5).fill(``).map((item, i) => {
                  return (
                      <React.Fragment key={Math.random()}>
                      <input className="rating__input" key={`input-rating-${i + 1}`} defaultChecked={i === 2}
                             id={`star-${i + 1}`} type="radio" name="rating" value={i + 1}
                             onChange={(evt) => changeRating(evt.target.value)}/>
                      <label className="rating__label" htmlFor={`star-${i + 1}`}>Rating {i + 1}</label>
                      </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="add-review__text" style={{
              backgroundColor,
              filter: `brightness(1.1)`,
            }}>
            <textarea className="add-review__textarea" ref={textRef} name="review-text" id="review-text"
                      placeholder="Review text" minLength={50} maxLength={400} required/>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled={reviewStatus === LoadingStatus.SENDING}>
                  {reviewStatus === LoadingStatus.SENDING ? `Sending...` : `Post`}
                </button>
              </div>

            </div>
          </form>
        </div>

      </section>
  );
};

const mapStateToProps = (state) => ({
  reviewStatus: getReviewLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  sendReview: (review, filmId) => dispatch(UserOperation.sendReview(review, filmId)),
  resetReviewLoadingStatus() {
    return dispatch(UserActionCreator.changeReviewStatus(LoadingStatus.PENDING));
  },
});

AddReview.propTypes = {
  film: PropTypes.shape({
    backgroundColor: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    posterImage: PropTypes.string.isRequired,
  }).isRequired,
  reviewStatus: PropTypes.string.isRequired,
  sendReview: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  resetReviewLoadingStatus: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddReview));
