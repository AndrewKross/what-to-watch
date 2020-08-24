import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  REVIEWS_IN_COLUMN_COUNT,
  REVIEW_DATE_HUMAN_FORMAT,
  REVIEW_DATE_SERVICE_FORMAT,
  TabsNames,
  TabsData,
} from "../../const";
import { getFormatedRunTime } from "../../utils/common";
import { getRatingGrade } from "../../utils/films";

export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: TabsNames.OVERVIEW,
    };
  }

  render() {
    return (
      <React.Fragment>
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {TabsData.map((tab) => {
              const { name, content } = tab;
              const activeClass = this.state.activeTab === name ? `movie-nav__item--active` : ``;

              return (
                <li key={name} className={`movie-nav__item ${activeClass}`}>
                  <a
                    href="#"
                    className="movie-nav__link"
                    onClick={() => {
                      if (this.state.activeTab !== name) {
                        this.setState({
                          activeTab: name,
                        });
                      }
                    }}
                  >
                    {content}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {this._renderTabContent(this.state.activeTab)}
      </React.Fragment>
    );
  }

  _getOverviewTab = () => {
    const {
      rating, ratingsCount, director, actors, description,
    } = this.props.film;

    return (
      <React.Fragment>
        <div className="movie-rating">
          <div className="movie-rating__score">{rating}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{getRatingGrade(rating)}</span>
            <span className="movie-rating__count">{ratingsCount} ratings</span>
          </p>
        </div>

        <div className="movie-card__text">
          {description}
          <p className="movie-card__director">
            <strong>Director: {director}</strong>
          </p>
          <p className="movie-card__starring">
            <strong>Starring: {actors.join(`, `)}</strong>
          </p>
        </div>
      </React.Fragment>
    );
  };

  _getDetailsTab = () => {
    const {
      director, actors, runTime, genre, release,
    } = this.props.film;

    return (
      <div className="movie-card__text movie-card__row">
        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Director</strong>
            <span className="movie-card__details-value">{director}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Starring</strong>
            <span className="movie-card__details-value">
              {actors.map((actor) => (
                <React.Fragment key={actor}>
                  {actor}
                  <br />
                </React.Fragment>
              ))}
            </span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">{getFormatedRunTime(runTime)}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{release}</span>
          </p>
        </div>
      </div>
    );
  };

  _getReviewsTab() {
    const { reviews } = this.props.film;

    const getReviewMarkup = (review) => {
      const {
        id, text, rating, userName, date,
      } = review;
      const reviewDateInHumanFormat = moment(date).format(REVIEW_DATE_HUMAN_FORMAT);
      const reviewDateInServiceFormat = moment(date).format(REVIEW_DATE_SERVICE_FORMAT);

      return (
        <div key={id} className="review">
          <blockquote className="review__quote">
            <p className="review__text">{text}</p>
            <footer className="review__details">
              <cite className="review__author">{userName}</cite>
              <time className="review__date" dateTime={reviewDateInServiceFormat}>
                {reviewDateInHumanFormat}
              </time>
            </footer>
          </blockquote>
          <div className="review__rating">{rating}</div>
        </div>
      );
    };

    return (
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {reviews.slice(0, REVIEWS_IN_COLUMN_COUNT).map((review) => getReviewMarkup(review))}
        </div>
        <div className="movie-card__reviews-col">
          {reviews.slice(REVIEWS_IN_COLUMN_COUNT).map((review) => getReviewMarkup(review))}
        </div>
      </div>
    );
  }

  _renderTabContent() {
    switch (this.state.activeTab) {
      case TabsNames.OVERVIEW:
        return this._getOverviewTab();

      case TabsNames.DETAILS:
        return this._getDetailsTab();

      case TabsNames.REVIEWS:
        return this._getReviewsTab();

      default:
        return this._getOverviewTab();
    }
  }
}

Tabs.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratingsCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string),
    runTime: PropTypes.number.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
      }),
    ).isRequired,
  }).isRequired,
};
