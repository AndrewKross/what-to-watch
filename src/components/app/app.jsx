import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { AppRoute } from "../../const";
import MainPage from "../main-page/main-page.jsx";
import FilmPage from "../film-page/film-page.jsx";

const App = ({ filmsData, filmsOnScreen }) => (
  <BrowserRouter>
    <Switch>
      <Route exact path={AppRoute.MAIN}>
        <MainPage
          films={filmsData}
          filmsOnScreen={filmsOnScreen}
          promoFilmData={filmsData[0]}
        />
      </Route>
      <Route exact path={`${AppRoute.FILM}:id`}
        render={({ match }) => {
          const selectedFilm = filmsData.find((film) => film.id === +match.params.id);
          return (
            <FilmPage
              selectedFilm={selectedFilm}
              films={filmsData}
              filmsOnScreen={filmsOnScreen}
            />
          );
        }} />
    </Switch>
  </BrowserRouter>
);

const mapStateToProps = (state) => ({
  filmsData: state.allFilms,
  filmsOnScreen: state.filmsOnScreen,
});

App.propTypes = {
  filmsOnScreen: PropTypes.number.isRequired,
  filmsData: PropTypes.array.isRequired,
};

export { App as AppComponent };
export default connect(mapStateToProps)(App);
