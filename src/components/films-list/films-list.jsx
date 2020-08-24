import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ActionCreator } from "../../reducer/reducer";
import FilmCard from "../film-card/film-card.jsx";

class FilmsList extends Component {
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
            onFilmCardHover={this._handlerCardHover}
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

const mapStateToProps = (state) => ({
  films: state.films,
});

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onFilmCardClick: PropTypes.func.isRequired,
};

export { FilmsList };
export default connect(mapStateToProps)(FilmsList);
