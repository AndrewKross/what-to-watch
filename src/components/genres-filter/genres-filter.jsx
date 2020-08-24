import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { GENRES } from '../../const';
import { ActionCreator } from "../../reducer/reducer";

const GenresFilter = ({ currentGenre, onGenreChangeClick }) => (
  <ul className="catalog__genres-list">
    {GENRES.map((genre) => (
        <li
            className={`catalog__genres-item ${currentGenre === genre
              ? `catalog__genres-item--active` : ``}`}
            key={genre}
            onClick={() => { onGenreChangeClick(genre); }}
        >
          <a href="#" className="catalog__genres-link">
            {genre}
          </a>
        </li>
    ))}
  </ul>
);

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChangeClick: (genre) => dispatch(ActionCreator.changeCurrentGenre(genre)),
});

GenresFilter.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  onGenreChangeClick: PropTypes.func.isRequired,
};

export { GenresFilter };
export default connect(mapStateToProps, mapDispatchToProps)(GenresFilter);
