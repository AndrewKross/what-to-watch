import * as React from 'react';
import { connect } from 'react-redux';
import { ActionCreator as AppStateActionCreator } from '../../reducer/app-state/app-state';
import { getFilms } from '../../reducer/data/selectors';
import { getCurrentGenre } from '../../reducer/app-state/selectors';
import { Film } from '../../types';

interface Props {
  films: Film[];
  currentGenre: string;
  onGenreChangeClick: (genre: string) => void;
}

const GenresFilter: React.FunctionComponent<Props> = ({
  films, currentGenre, onGenreChangeClick
}: Props) => {
  const allGenres = films.map((film) => film.genre);
  const genres = [].concat(`All genres`, Array.from(new Set(allGenres)));
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          className={`catalog__genres-item ${currentGenre === genre
            ? `catalog__genres-item--active` : ``}`}
          key={genre}
          onClick={() => { if (currentGenre !== genre) { onGenreChangeClick(genre); } }}
        >
          <a href="#" className="catalog__genres-link">
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => ( {
  currentGenre: getCurrentGenre(state),
  films: getFilms(state),
} );

const mapDispatchToProps = (dispatch) => ( {
  onGenreChangeClick: (genre) => {
    dispatch(AppStateActionCreator.changeCurrentGenre(genre));
    dispatch(AppStateActionCreator.resetShowingFilmsCount());
  },
} );

export { GenresFilter as GenresFilterComponent };
export default connect(mapStateToProps, mapDispatchToProps)(GenresFilter);
