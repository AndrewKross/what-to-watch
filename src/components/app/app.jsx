import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import MainPage from "../main-page/main-page.jsx";
import FilmPage from "../film-page/film-page.jsx";
import filmsData from "../../mocks/films";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilm: null,
    };

    this.filmCardClickHandler = this.filmCardClickHandler.bind(this);
  }

  filmCardClickHandler(selectedFilm) {
    this.setState({ selectedFilm });
  }

  _renderApp() {
    const { promoFilmData } = this.props;

    if (this.state.selectedFilm) {
      return (
        <FilmPage
          selectedFilm={this.state.selectedFilm}
          films={filmsData}
          onFilmCardClick={this.filmCardClickHandler}
        />
      );
    }

    return (
      <MainPage
        films={filmsData}
        promoFilmData={promoFilmData}
        onFilmCardClick={this.filmCardClickHandler}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/film-page">
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
}

App.propTypes = {
  promoFilmData: PropTypes.object.isRequired,
};

export default App;
