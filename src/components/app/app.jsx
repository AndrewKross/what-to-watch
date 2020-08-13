import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import MainPage from "../main-page/main-page.jsx";
import FilmPage from "../film-page/film-page.jsx";
import { filmsData } from "../../mocks/films.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilm: null,
    };

    this.filmTitleClickHandler = this.filmTitleClickHandler.bind(this);
  }

  filmTitleClickHandler(selectedFilm) {
    this.setState({ selectedFilm });
  }

  _renderApp() {
    const { promoFilmData } = this.props;

    if (this.state.selectedFilm) {
      return (
        <FilmPage
          selectedFilm={this.state.selectedFilm}
          filmsList={filmsData}
          promoFilmData={promoFilmData}
          onFilmCardClick={this.filmTitleClickHandler}
        />
      );
    }

    return (
      <MainPage
        filmsList={filmsData}
        promoFilmData={promoFilmData}
        onFilmCardClick={this.filmTitleClickHandler}
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
              filmsList={filmsData}
              onFilmCardClick={this.filmTitleClickHandler}
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
