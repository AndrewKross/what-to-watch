import React from "react";
import PropTypes from "prop-types";
import { GENRES } from "../../const";
import FilmsList from "../films-list/films-list.jsx";

const getActiveGenre = (index) => (index === 0 ? `catalog__genres-item--active` : ``);

const Catalog = ({ films, onFilmCardClick }) => (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>
    <ul className="catalog__genres-list">
      {GENRES.map((genre, index) => (
        <li
          className={`catalog__genres-item ${getActiveGenre(index)}`}
          key={genre}
        >
          <a href="#" className="catalog__genres-link">
            {genre}
          </a>
        </li>
      ))}
    </ul>
    <FilmsList films={films} onFilmCardClick={onFilmCardClick} />
    <div className="catalog__more">
      <button className="catalog__button" type="button">
        Show more
      </button>
    </div>
  </section>
);

Catalog.propTypes = {
  films: PropTypes.array.isRequired,
  onFilmCardClick: PropTypes.func.isRequired,
};

export default Catalog;
