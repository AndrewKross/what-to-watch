import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import FilmCard from "../film-card/film-card.jsx";

export default class FilmsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { filmsList, onFilmCardClick } = this.props;
    return (
      <div className="catalog__movies-list">
        {filmsList.map((filmData) => (
          <FilmCard
            key={filmData.id}
            filmData={filmData}
            onFilmCardClick={onFilmCardClick}
          />
        ))}
      </div>
    );
  }
}

FilmsList.propTypes = {
  filmsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFilmCardClick: PropTypes.func.isRequired,
};
