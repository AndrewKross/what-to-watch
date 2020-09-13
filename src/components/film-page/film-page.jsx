import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom';
import Tabs from "../tabs/tabs.jsx";
import FilmsList from "../films-list/films-list.jsx";
import { AppRoute, NUMBER_OF_SIMILAR_FILMS } from '../../const';
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";

class FilmPage extends Component {
  componentDidMount() {
    this.props.loadComments(this.props.selectedFilm.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedFilm !== this.props.selectedFilm) {
      this.props.loadComments(this.props.selectedFilm.id);
    }
  }

  render() {
    const {
      films, selectedFilm, history, comments, isAuthorized,
    } = this.props;
    const {
      title, posterImage, genre, released, id, backgroundImage, backgroundColor,
    } = selectedFilm;
    const similarFilms = films
      .filter((film) => selectedFilm.genre === film.genre && selectedFilm !== film);

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full" style={{ backgroundColor: `${backgroundColor}` }}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={backgroundImage} alt={title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header />

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{released}</span>
                </p>

                <div className="movie-card__buttons">
                  <button
                    className="btn btn--play movie-card__button"
                    type="button"
                    onClick={() => { history.push(AppRoute.PLAYER + id); }}
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use href="#play-s"/>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button
                    className="btn btn--list movie-card__button"
                    type="button"
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use href="#add"/>
                    </svg>
                    <span>My list</span>
                  </button>
                  {isAuthorized && <Link to={`${AppRoute.FILM + id}/review`}
                                         className="btn movie-card__button">Add review</Link>}
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img
                  src={posterImage}
                  alt={`${title} poster`}
                  width="218"
                  height="327"
                />
              </div>

              <div className="movie-card__desc">
                <Tabs film={selectedFilm} comments={comments} />
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <FilmsList
              films={similarFilms}
              filmsOnScreen={NUMBER_OF_SIMILAR_FILMS}
            />

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
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string.isRequired,
  }).isRequired,
  films: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  loadComments: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};

export default withRouter(FilmPage);
