import React from "react";
import PropTypes from "prop-types";
import FilmsList from "../films-list/films-list.jsx";
import GenresFilter from "../genres-filter/genres-filter.jsx";

const Catalog = ({ films, filmsOnScreen }) => (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>
    <GenresFilter />
    <FilmsList films={films}
      filmsOnScreen={filmsOnScreen} />
  </section>
);

Catalog.propTypes = {
  films: PropTypes.array.isRequired,
  filmsOnScreen: PropTypes.number.isRequired,
};

export default Catalog;
