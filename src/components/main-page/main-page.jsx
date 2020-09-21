import React from 'react';
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import PromoFilm from "../promo-film/promo-film.jsx";
import Catalog from "../catalog/catalog.jsx";
import Footer from "../footer/footer.jsx";
import WithFavoriteButton from '../../hocs/withFavoriteButton.jsx';

const PromoFilmWrapped = WithFavoriteButton(PromoFilm);

const MainPage = ({ films, filteredFilms, filmsOnScreen }) => {
  const promoFilm = films[0];
  return (
  <React.Fragment>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img
          src={promoFilm.backgroundImage}
          alt={promoFilm.title}
        />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <Header />
      <PromoFilmWrapped promoFilm={promoFilm}/>
    </section>

    <div className="page-content">
      <Catalog films={filteredFilms} filmsOnScreen={filmsOnScreen} />
      <Footer />
    </div>
  </React.Fragment>
  );
};

MainPage.propTypes = {
  films: PropTypes.array.isRequired,
  filmsOnScreen: PropTypes.number.isRequired,
  filteredFilms: PropTypes.array.isRequired,
};

export default MainPage;
