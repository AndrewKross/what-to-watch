import React from 'react';
import PropTypes from 'prop-types';
import {
  HashRouter, Link, Route, Router, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { AppRoute, HttpStatus, LoaderData } from '../../const';
import MainPage from '../main-page/main-page.jsx';
import FilmPage from '../film-page/film-page.jsx';
import MainPlayer from '../main-player/main-player.jsx';
import {
  ActionCreator as DataActionCreator,
  Operation as DataOperation,
} from '../../reducer/data/data';
import {
  getComments, getFilms, getFilmsLoadingStatus, getPromoFilm, getPromoFilmLoadState,
  getRequestStatus,
} from '../../reducer/data/selectors';
import { getFilmsOnScreen, getFilteredFilms } from '../../reducer/app-state/selectors';
import SignIn from '../sign-in/sign-in.jsx';
import { getFilmFromRoute } from '../../utils/films';
import AddReview from '../add-review/add-review.jsx';
import { getAuthorizationStatus } from '../../reducer/user/selectors';
import history from '../../history';
import UserPage from '../user-page/user-page.jsx';
import Error from '../error/error.jsx';

const App = ({
  filteredFilms, filmsOnScreen, comments, loadComments,
  isAuthorized, isFilmsLoaded, films, requestStatus, promoFilm, isPromoFilmLoaded,
}) => {
  if (!isFilmsLoaded && !isPromoFilmLoaded) {
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

  if (requestStatus !== HttpStatus.SUCCESS) {
    return (
      <Error requestStatus={requestStatus}/>
    );
  }

  return (
    <HashRouter>
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.MAIN}
                 render={() => {
                   return (<MainPage
                     filteredFilms={filteredFilms}
                     filmsOnScreen={filmsOnScreen}
                     promoFilm={promoFilm}
                   />);
                 }}
          />
          <Route exact path={`${AppRoute.FILM}:id`}
                 render={({ match }) => {
                   return (<FilmPage
                     selectedFilm={getFilmFromRoute(films, match)}
                     comments={comments}
                     loadComments={loadComments}
                     films={filteredFilms}
                     filmsOnScreen={filmsOnScreen}
                     isAuthorized={isAuthorized}
                   />);
                 }}
          />
          <Route exact path={`${AppRoute.FILM}:id/review`}
                 render={({ match }) => (isAuthorized
                   ? <AddReview film={getFilmFromRoute(filteredFilms, match)}/>
                   : <SignIn/>)
                 }
          />
          <Route exact path={`${AppRoute.PLAYER}:id`}
                 render={({ match }) => <MainPlayer film={getFilmFromRoute(filteredFilms, match)}/>}
          />
          <Route exact path={AppRoute.LOGIN} component={SignIn}/>
          <Route exact path={AppRoute.MY_LIST}
                 render={() => (isAuthorized
                   ? <UserPage/>
                   : <SignIn/>)}/>
          <Route
            render={() => (
              <React.Fragment>
                <h1>
                  Error: 404. Page not found.
                </h1>
                <Link to={AppRoute.MAIN}>Go to main page</Link>
              </React.Fragment>
            )}
          />
        </Switch>
      </Router>
    </HashRouter>
  );
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  filteredFilms: getFilteredFilms(state),
  filmsOnScreen: getFilmsOnScreen(state),
  promoFilm: getPromoFilm(state),
  comments: getComments(state),
  isAuthorized: getAuthorizationStatus(state),
  isFilmsLoaded: getFilmsLoadingStatus(state),
  requestStatus: getRequestStatus(state),
  isPromoFilmLoaded: getPromoFilmLoadState(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadComments(filmId) {
    dispatch(DataActionCreator.changeCommentsLoadState(false));
    dispatch(DataOperation.loadComments(filmId));
  },
});

App.propTypes = {
  films: PropTypes.array.isRequired,
  filmsOnScreen: PropTypes.number.isRequired,
  filteredFilms: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  loadComments: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  isFilmsLoaded: PropTypes.bool.isRequired,
  requestStatus: PropTypes.number.isRequired,
  promoFilm: PropTypes.object.isRequired,
  isPromoFilmLoaded: PropTypes.bool.isRequired,
};

export { App as AppComponent };
export default connect(mapStateToProps, mapDispatchToProps)(App);
