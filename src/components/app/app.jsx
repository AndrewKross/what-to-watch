import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Screen } from "../../const";
import MainPage from "../main-page/main-page.jsx";
import FilmPage from "../film-page/film-page.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeScreen: Screen.MAIN,
    };

    this.activeFilm = null;
  }

  render() {
    const { filmsData } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/">
            {this._renderScreen()}
          </Route>
          <Route path="/film-page">
            <FilmPage
              selectedFilm={filmsData[0]}
              films={filmsData}
              onFilmCardClick={this.filmCardClickHandler}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  filmCardClickHandler = (film) => {
    this.setState({
      activeScreen: Screen.CARD,
    });

    this.activeFilm = film;
  }

  _renderScreen() {
    const { promoFilmData, filmsData } = this.props;

    switch (this.state.activeScreen) {
      case Screen.MAIN:
        return (
          <MainPage
            films={filmsData}
            promoFilmData={promoFilmData}
            onFilmCardClick={this.filmCardClickHandler}
          />
        );

      case Screen.CARD:
        return (
          <FilmPage
            selectedFilm={this.activeFilm}
            films={filmsData}
            onFilmCardClick={this.filmCardClickHandler}
          />
        );

      default:
        return null;
    }
  }
}

const mapStateToProps = (state) => ({
  filmsData: state.allFilms,
});

App.propTypes = {
  promoFilmData: PropTypes.object.isRequired,
  filmsData: PropTypes.array.isRequired,
};

export { App as AppComponent };
export default connect(mapStateToProps)(App);
