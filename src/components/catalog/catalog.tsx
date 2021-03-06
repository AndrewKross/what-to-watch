import * as React from 'react';
import { Film } from '../../types';
import FilmsList from '../films-list/films-list';
import GenresFilter from '../genres-filter/genres-filter';

interface Props {
  films: Film[],
  filmsOnScreen: number,
}

const Catalog: React.FunctionComponent<Props> = ({ films, filmsOnScreen }: Props) => (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>
    <GenresFilter/>
    <FilmsList films={films}
               filmsOnScreen={filmsOnScreen}/>
  </section>
);

export default Catalog;
