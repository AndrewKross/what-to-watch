import * as React from 'react';
import { Film } from '../../types';
import Catalog from '../catalog/catalog';
import Footer from '../footer/footer';
import Header from '../header/header';
import PromoFilm from '../promo-film/promo-film';

interface Props {
  promoFilm: Film
  filmsOnScreen: number
  filteredFilms: Film[]
}

const MainPage: React.FunctionComponent<Props> = ({
  filteredFilms, filmsOnScreen, promoFilm,
}: Props) => (
  <React.Fragment>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img
          src={promoFilm.backgroundImage}
          alt={promoFilm.title}
        />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <Header/>
      <PromoFilm promoFilm={promoFilm}/>
    </section>

    <div className="page-content">
      <Catalog films={filteredFilms} filmsOnScreen={filmsOnScreen}/>
      <Footer/>
    </div>
  </React.Fragment>
);

export default MainPage;
