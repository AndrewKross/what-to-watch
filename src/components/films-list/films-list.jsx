import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FilmCard from "../film-card/film-card.jsx";
import ShowMore from '../show-more/show-more.jsx';

class FilmsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };
  }

  render() {
    const { filteredFilms, filmsOnScreen, onFilmCardClick } = this.props;
    return (
      <React.Fragment>
        <div className="catalog__movies-list">
          {filteredFilms.slice(0, filmsOnScreen).map((film) => (
              <FilmCard
                  key={film.id}
                  filmData={film}
                  onFilmCardHover={this._handlerCardHover}
                  onFilmCardClick={onFilmCardClick}
              />
          ))}
        </div>
        {filmsOnScreen < filteredFilms.length && <ShowMore />}
      </React.Fragment>
    );
  }

  _handlerCardHover = (film, activeCard) => {
    this.setState({
      activeCard,
    });
  };
}

const mapStateToProps = (state) => ({
  filteredFilms: state.filteredFilms,
  filmsOnScreen: state.filmsOnScreen,
});

FilmsList.propTypes = {
  filmsOnScreen: PropTypes.number.isRequired,
  filteredFilms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onFilmCardClick: PropTypes.func.isRequired,
};

export { FilmsList as FilmsListComponent };
export default connect(mapStateToProps)(FilmsList);
