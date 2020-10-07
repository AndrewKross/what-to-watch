import * as React from 'react';
import { Component } from 'react';
import * as moment from 'moment';
import { nanoid } from 'nanoid';
import {
  REVIEW_DATE_HUMAN_FORMAT,
  REVIEW_DATE_SERVICE_FORMAT,
  REVIEWS_IN_COLUMN_COUNT,
  TabsData,
  TabsNames,
} from '../../const';
import { getFormattedRunTime } from '../../utils/common.js';
import { getRatingGrade } from '../../utils/films.js';
import { Comment, Film } from '../../types';

interface Props {
  film: Film;
  comments: Comment[];
}

interface State {
  activeTab: string;
}

export default class Tabs extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeTab: TabsNames.OVERVIEW,
    };
  }

  render(): React.ReactNode {
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

        {this._renderTabContent()}
      </React.Fragment>
    );
  }

  _getOverviewTab = (): React.ReactNode => {
    const {
      rating, ratingsCount, director, starring, description,
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
            <strong>Starring: {starring.join(`, `)}</strong>
          </p>
        </div>
      </React.Fragment>
    );
  };

  _getDetailsTab = (): React.ReactNode => {
    const {
      director, starring, runTime, genre, released,
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
              {starring.map((actor) => (
                <React.Fragment key={actor}>
                  {actor}
                  <br/>
                </React.Fragment>
              ))}
            </span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">{getFormattedRunTime(runTime)}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{released}</span>
          </p>
        </div>
      </div>
    );
  };

  _getReviewsTab = (): React.ReactNode => {
    const { comments } = this.props;

    const getReviewMarkup = (review) => {
      const {
        text, rating, userName, date,
      } = review;
      const reviewDateInHumanFormat = moment(date).format(REVIEW_DATE_HUMAN_FORMAT);
      const reviewDateInServiceFormat = moment(date).format(REVIEW_DATE_SERVICE_FORMAT);

      return (
        <div key={nanoid()} className="review" style={{ overflowWrap: `break-word` }}>
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
          {comments.slice(0, REVIEWS_IN_COLUMN_COUNT).map((review) => getReviewMarkup(review))}
        </div>
        <div className="movie-card__reviews-col">
          {comments.slice(REVIEWS_IN_COLUMN_COUNT).map((review) => getReviewMarkup(review))}
        </div>
      </div>
    );
  };

  _renderTabContent = (): React.ReactNode => {
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
  };
}
