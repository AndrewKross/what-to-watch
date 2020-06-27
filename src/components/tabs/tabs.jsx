import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {getRatingLevel} from "../../utils.js";

export default class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: `overview`
    };

    this._renderTab = this._renderTab.bind(this);
  }

  _renderTab(selectedTab) {
    const {rating, votesCount, director, actors, description, runTime, releaseYear, genre} = this.props.movie;

    const OverviewElement = () => {
      return (<>
        <div className="movie-rating">
          <div className="movie-rating__score">{rating}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{getRatingLevel(rating)}</span>
            <span className="movie-rating__count">{votesCount} ratings</span>
          </p>
        </div>

        <div className="movie-card__text">
          {description}
          <p className="movie-card__director"><strong>Director: {director}</strong></p>
          <p className="movie-card__starring"><strong>Starring: {actors.join(`, `)}</strong></p>
        </div>
      </>);
    };

    const DetailsElement = () => {
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
                {actors.join(`/n`)}
              </span>
            </p>
          </div>

          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Run Time</strong>
              <span className="movie-card__details-value">{runTime}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Genre</strong>
              <span className="movie-card__details-value">{genre}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Released</strong>
              <span className="movie-card__details-value">{releaseYear}</span>
            </p>
          </div>
        </div>
      );
    };

    const ReviewsElement = () => {
      return (
        <div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">
                  {`Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`}</p>

                <footer className="review__details">
                  <cite className="review__author">Kate Muir</cite>
                  <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">8,9</div>
            </div>

            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">
                  {`Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`}</p>

                <footer className="review__details">
                  <cite className="review__author">Bill Goodykoontz</cite>
                  <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                </footer>
              </blockquote>

              <div className="review__rating">8,0</div>
            </div>

            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">
                  {`I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`}</p>

                <footer className="review__details">
                  <cite className="review__author">Amanda Greever</cite>
                  <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                </footer>
              </blockquote>

              <div className="review__rating">8,0</div>
            </div>
          </div>
          <div className="movie-card__reviews-col">
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">
                  {`The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`}</p>

                <footer className="review__details">
                  <cite className="review__author">Matthew Lickona</cite>
                  <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">7,2</div>
            </div>

            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">
                  {`It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`}</p>

                <footer className="review__details">
                  <cite className="review__author">Paula Fleri-Soler</cite>
                  <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">7,6</div>
            </div>

            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">
                  {`It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`}</p>

                <footer className="review__details">
                  <cite className="review__author">Paula Fleri-Soler</cite>
                  <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">7,0</div>
            </div>
          </div>
        </div>
      );
    };

    switch (selectedTab) {
      case `overview`:
        return <OverviewElement />;
      case `details`:
        return <DetailsElement />;
      case `reviews`:
        return <ReviewsElement />;
      default:
        return <OverviewElement />;
    }
  }

  render() {
    const {poster, title} = this.props.movie;
    const activeClass = `movie-nav__item movie-nav__item--active`;

    return (
      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={poster} alt={title + ` poster`} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              <ul className="movie-nav__list">
                <li className={this.state.selectedTab === `overview` ? activeClass : `movie-nav__item`}>
                  <a href="#" className="movie-nav__link"
                    onClick={(evt) => {
                      evt.preventDefault();
                      this.setState({selectedTab: `overview`});
                    }}>Overview</a>
                </li>
                <li className={this.state.selectedTab === `details` ? activeClass : `movie-nav__item`}>
                  <a href="#" className="movie-nav__link"
                    onClick={(evt) => {
                      evt.preventDefault();
                      this.setState({selectedTab: `details`});
                    }}>Details</a>
                </li>
                <li className={this.state.selectedTab === `reviews` ? activeClass : `movie-nav__item`}>
                  <a href="#" className="movie-nav__link"
                    onClick={(evt) => {
                      evt.preventDefault();
                      this.setState({selectedTab: `reviews`});
                    }}>Reviews</a>
                </li>
              </ul>
            </nav>

            {this._renderTab(this.state.selectedTab)}

          </div>
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    votesCount: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    runTime: PropTypes.string.isRequired,
    releaseYear: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
