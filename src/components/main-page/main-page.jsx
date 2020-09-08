import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import PromoFilm from "../promo-film/promo-film.jsx";
import Catalog from "../catalog/catalog.jsx";
import Footer from "../footer/footer.jsx";

const MainPage = ({ films, promoFilmData, filmsOnScreen }) => (
  <React.Fragment>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img
          src={promoFilmData.backgroundImage}
          alt={promoFilmData.title}
        />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <Header />
      <PromoFilm promoFilmData={promoFilmData} />
    </section>

    <div className="page-content">
      <Catalog films={films} filmsOnScreen={filmsOnScreen} />
      <Footer />
    </div>
  </React.Fragment>
);

MainPage.propTypes = {
  films: PropTypes.array.isRequired,
  promoFilmData: PropTypes.object.isRequired,
  filmsOnScreen: PropTypes.number.isRequired,
};

export default MainPage;
