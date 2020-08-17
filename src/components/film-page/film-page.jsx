import React, { Component } from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import FilmsList from "../films-list/films-list.jsx";
import { NUMBER_OF_SIMILAR_FILMS } from "../../const.js";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";

export default class FilmPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { films, selectedFilm, onFilmCardClick } = this.props;
    const { title, poster, genre, release } = selectedFilm;
    const similarFilms = films
      .filter(
        (film) => selectedFilm.genre === film.genre && selectedFilm !== film
      )
      .slice(0, NUMBER_OF_SIMILAR_FILMS);

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={poster} alt={title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header />

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{release}</span>
                </p>

                <div className="movie-card__buttons">
                  <button
                    className="btn btn--play movie-card__button"
                    type="button"
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use href="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button
                    className="btn btn--list movie-card__button"
                    type="button"
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use href="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                  <a href="add-review.html" className="btn movie-card__button">
                    Add review
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img
                  src={poster}
                  alt={title + ` poster`}
                  width="218"
                  height="327"
                />
              </div>

              <div className="movie-card__desc">
                <Tabs film={selectedFilm} />
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <FilmsList films={similarFilms} onFilmCardClick={onFilmCardClick} />
          </section>

          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

FilmPage.propTypes = {
  selectedFilm: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
  }).isRequired,
  films: PropTypes.array.isRequired,
  onFilmCardClick: PropTypes.func.isRequired,
};
