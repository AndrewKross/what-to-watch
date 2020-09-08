import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ActionCreator as DataActionCreator } from "../../reducer/data/data";
import { ActionCreator as AppStateActionCreator } from '../../reducer/app-state/app-state';
import { getCurrentGenre, getFilms } from '../../reducer/data/selectors';

const GenresFilter = ({ films, currentGenre, onGenreChangeClick }) => {
  const allGenres = films.map((film) => film.genre);
  const genres = [].concat(`All genres`, Array.from(new Set(allGenres)));
  return (
      <ul className="catalog__genres-list">
        {genres.map((genre) => (
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
};

const mapStateToProps = (state) => ({
  currentGenre: getCurrentGenre(state),
  films: getFilms(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChangeClick: (genre) => {
    dispatch(DataActionCreator.changeCurrentGenre(genre));
    dispatch(AppStateActionCreator.resetShowingFilmsCount());
  },
});

GenresFilter.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  onGenreChangeClick: PropTypes.func.isRequired,
  films: PropTypes.array.isRequired,
};

export { GenresFilter as GenresFilterComponent };
export default connect(mapStateToProps, mapDispatchToProps)(GenresFilter);
