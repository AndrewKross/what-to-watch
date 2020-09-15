import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { AppRoute, LoaderData } from '../../const';
import MainPage from "../main-page/main-page.jsx";
import FilmPage from "../film-page/film-page.jsx";
import MainPlayer from '../main-player/main-player.jsx';
import { ActionCreator as DataActionCreator, Operation as DataOperation } from '../../reducer/data/data';
import { getComments, getFilmsLoadingStatus, getPromoFilm } from '../../reducer/data/selectors';
import { getFilmsOnScreen, getFilteredFilms } from '../../reducer/app-state/selectors';
import SignIn from "../sign-in/sign-in.jsx";
import { getFilmFromRoute } from '../../utils/films';
import AddReview from "../add-review/add-review.jsx";
import { getAuthorizationStatus } from '../../reducer/user/selectors';

const App = ({
  filteredFilms, filmsOnScreen, promoFilm, comments, loadComments, isAuthorized, isFilmsLoaded,
}) => {
  if (!isFilmsLoaded) {
    return (
      <div style={LoaderData.STYLE}>
        <Loader
          type={LoaderData.TYPE}
          color={LoaderData.COLOR}
          width={LoaderData.HEIGHT}
          height={LoaderData.WIDTH}
        />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <MainPage
            films={filteredFilms}
            filmsOnScreen={filmsOnScreen}
            promoFilmData={promoFilm}
          />
        </Route>
        <Route exact path={`${AppRoute.FILM}:id`}
          render={({ match }) => {
            return (<FilmPage
              selectedFilm={getFilmFromRoute(filteredFilms, match)}
              comments={comments}
              loadComments={loadComments}
              films={filteredFilms}
              filmsOnScreen={filmsOnScreen}
              isAuthorized={isAuthorized}
            />);
          }}
        />
        <Route exact path={`${AppRoute.FILM}:id/review`}
          render={({ match }) => {
            if (isAuthorized) {
              return <AddReview film={getFilmFromRoute(filteredFilms, match)} />;
            }
            return <SignIn />;
          }}
        />
        <Route exact path={`${AppRoute.PLAYER}:id`}
          render={({ match }) => <MainPlayer film={getFilmFromRoute(filteredFilms, match)} />}
        />
        <Route exact path={AppRoute.LOGIN} component={SignIn} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  filteredFilms: getFilteredFilms(state),
  filmsOnScreen: getFilmsOnScreen(state),
  promoFilm: getPromoFilm(state),
  comments: getComments(state),
  isAuthorized: getAuthorizationStatus(state),
  isFilmsLoaded: getFilmsLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadComments(filmId) {
    dispatch(DataActionCreator.changeCommentsLoadState(false));
    dispatch(DataOperation.loadComments(filmId));
  },
});

App.propTypes = {
  filmsOnScreen: PropTypes.number.isRequired,
  filteredFilms: PropTypes.array.isRequired,
  promoFilm: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  loadComments: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  isFilmsLoaded: PropTypes.bool.isRequired,
};

export { App as AppComponent };
export default connect(mapStateToProps, mapDispatchToProps)(App);
