import * as React from 'react';
import { Film } from '../../types';
import FilmCard from '../film-card/film-card';
import ShowMore from '../show-more/show-more';

interface Props {
  filmsOnScreen?: number;
  films: Film[];
}

const FilmsList: React.FunctionComponent<Props> = ({
  films, filmsOnScreen = films.length,
}: Props) => (
  <React.Fragment>
    <div className="catalog__movies-list">
      {films.slice(0, filmsOnScreen).map((film) => (
        <FilmCard
          key={`filmCard-${film.id}`}
          filmData={film}
        />
      ))}
    </div>
    {filmsOnScreen < films.length && <ShowMore/>}
  </React.Fragment>
);

export default FilmsList;
