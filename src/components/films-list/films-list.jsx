import React, { Component } from "react";
import PropTypes from "prop-types";
import FilmCard from "../film-card/film-card.jsx";

export default class FilmsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };
  }

  render() {
    const { films, onFilmCardClick } = this.props;
    return (
      <div className="catalog__movies-list">
        {films.map((film) => (
          <FilmCard
            key={film.id}
            filmData={film}
            onCardHover={this._handlerCardHover}
            onFilmCardClick={onFilmCardClick}
          />
        ))}
      </div>
    );
  }

  _handlerCardHover = (film, activeCard) => {
    this.setState({
      activeCard,
    });
  };
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFilmCardClick: PropTypes.func.isRequired,
};
