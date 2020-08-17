import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import PromoFilm from "../promo-film/promo-film.jsx";
import Catalog from "../catalog/catalog.jsx";
import Footer from "../footer/footer.jsx";

const MainPage = ({ films, onFilmCardClick, promoFilmData }) => (
  <React.Fragment>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img
          src="img/bg-the-grand-budapest-hotel.jpg"
          alt="The Grand Budapest Hotel"
        />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <Header />
      <PromoFilm promoFilmData={promoFilmData} />
    </section>

    <div className="page-content">
      <Catalog films={films} onFilmCardClick={onFilmCardClick} />
      <Footer />
    </div>
  </React.Fragment>
);

MainPage.propTypes = {
  films: PropTypes.array.isRequired,
  onFilmCardClick: PropTypes.func.isRequired,
  promoFilmData: PropTypes.object.isRequired,
};

export default MainPage;
