import React from "react";
import PropTypes from "prop-types";
import FilmCard from "../film-card/film-card.jsx";
import ShowMore from '../show-more/show-more.jsx';

const FilmsList = ({ filteredFilms, filmsOnScreen }) => (
  <React.Fragment>
    <div className="catalog__movies-list">
      {filteredFilms.slice(0, filmsOnScreen).map((film) => (
        <FilmCard
          key={`filmCard-${film.id}`}
          filmData={film}
        />
      ))}
    </div>
    {filmsOnScreen < filteredFilms.length && <ShowMore />}
  </React.Fragment>
);

FilmsList.propTypes = {
  filmsOnScreen: PropTypes.number.isRequired,
  filteredFilms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default FilmsList;
