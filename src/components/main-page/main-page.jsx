import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import PromoFilm from "../promo-film/promo-film.jsx";
import FilmsList from "../films-list/films-list.jsx";

export default class MainPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { filmsList, onFilmCardClick, promoFilmData } = this.props;

    return (
      <React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img
              src="img/bg-the-grand-budapest-hotel.jpg"
              alt="The Grand Budapest Hotel"
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <PromoFilm
            promoFilmData={promoFilmData}
          />
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <ul className="catalog__genres-list">
              <li className="catalog__genres-item catalog__genres-item--active">
                <a href="#" className="catalog__genres-link">
                  All genres
                </a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">
                  Comedies
                </a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">
                  Crime
                </a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">
                  Documentary
                </a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">
                  Dramas
                </a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">
                  Horror
                </a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">
                  Kids & Family
                </a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">
                  Romance
                </a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">
                  Sci-Fi
                </a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">
                  Thrillers
                </a>
              </li>
            </ul>

            <FilmsList
              filmsList={filmsList}
              onFilmCardClick={onFilmCardClick}
            />

            <div className="catalog__more">
              <button className="catalog__button" type="button">
                Show more
              </button>
            </div>
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2020 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

MainPage.propTypes = {
  filmsList: PropTypes.array.isRequired,
  onFilmCardClick: PropTypes.func.isRequired,
  promoFilmData: PropTypes.object.isRequired,
};
