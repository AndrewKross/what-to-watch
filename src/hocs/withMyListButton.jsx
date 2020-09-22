import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../history';
import { AppRoute } from '../const';
import { Operation as DataOperation } from '../reducer/data/data';
import { getAuthorizationStatus } from '../reducer/user/selectors';
import { getFilms } from '../reducer/data/selectors';

const withMyListButton = (Component) => {
  const Wrapped = (props) => {
    const {
      promoFilm, selectedFilm, isAuthorized, changeFavoriteStatus,
    } = props;
    const film = promoFilm || selectedFilm;
    const { id, isFavorite } = film;

    const handleMyListClick = () => {
      return isAuthorized
        ? changeFavoriteStatus(id, Number(!isFavorite))
        : history.push(AppRoute.LOGIN);
    };

    const renderMyListButton = () => (
      <button
        className="btn btn--list movie-card__button"
        type="button"
        onClick={handleMyListClick}
      >

        {
          isFavorite && isAuthorized ? (
            <svg viewBox="0 0 18 14" width="18" height="14">
              <use xlinkHref="#in-list"/>
            </svg>
          ) : (
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use href="#add"/>
            </svg>)
        }

        <span>My list</span>
      </button>
    );

    return (
      <Component
        {...props}
        renderMyListButton={renderMyListButton}/>
    );
  };

  Wrapped.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    selectedFilm: PropTypes.object,
    promoFilm: PropTypes.object,
    changeFavoriteStatus: PropTypes.func.isRequired,
  };

  return Wrapped;
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthorizationStatus(state),
  films: getFilms(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeFavoriteStatus: (id, status) => dispatch(DataOperation.changeFavoriteStatus(id, status)),
});

export { withMyListButton };
export default (Component) => connect(
  mapStateToProps, mapDispatchToProps,
)(withMyListButton(Component));
