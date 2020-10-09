import * as React from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Link, Route, Router, Switch } from 'react-router-dom';
import { AppRoute, HttpStatus, LoaderData } from '../../const';
import history from '../../history';
import { getFilmsOnScreen, getFilteredFilms } from '../../reducer/app-state/selectors';
import {
  ActionCreator as DataActionCreator,
  Operation as DataOperation,
} from '../../reducer/data/data';
import {
  getComments,
  getFilms,
  getFilmsLoadingStatus,
  getPromoFilm,
  getPromoFilmLoadState,
  getRequestStatus,
} from '../../reducer/data/selectors';
import { getAuthorizationStatus } from '../../reducer/user/selectors';
import { Comment, Film } from '../../types';
import { getFilmFromRoute } from '../../utils/films';
import AddReview from '../add-review/add-review';
import FilmPage from '../film-page/film-page';
import MainPage from '../main-page/main-page';
import MainPlayer from '../main-player/main-player';
import SignIn from '../sign-in/sign-in';
import UserPage from '../user-page/user-page';

interface Props {
  films: Film[],
  filmsOnScreen: number,
  filteredFilms: Film[],
  comments: Comment[]
  loadComments: () => void,
  isAuthorized: boolean,
  isFilmsLoaded: boolean,
  requestStatus: number,
  promoFilm: Film,
  isPromoFilmLoaded: boolean,
}

const App: React.FunctionComponent<Props> = ({
  filteredFilms, filmsOnScreen, comments, loadComments, isAuthorized, isFilmsLoaded,
  films, requestStatus, promoFilm, isPromoFilmLoaded,
}: Props) => {
  if (!isFilmsLoaded || !isPromoFilmLoaded) {
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
      <h1>Error: {requestStatus}</h1>
    );
  }

  return (
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
               render={({ match }) => <MainPlayer
                 film={getFilmFromRoute(filteredFilms, match)}/>}
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

export { App as AppComponent };
export default connect(mapStateToProps, mapDispatchToProps)(App);
