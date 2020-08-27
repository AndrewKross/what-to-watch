import React from "react";
import PropTypes from "prop-types";
import FilmsList from "../films-list/films-list.jsx";
import GenresFilter from "../genres-filter/genres-filter.jsx";

const Catalog = ({ onFilmCardClick }) => (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>
    <GenresFilter />
    <FilmsList onFilmCardClick={onFilmCardClick} />
  </section>
);

Catalog.propTypes = {
  onFilmCardClick: PropTypes.func.isRequired,
};

export default Catalog;
