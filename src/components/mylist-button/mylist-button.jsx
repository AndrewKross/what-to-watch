import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../../history';
import { AppRoute } from '../../const';
import { Operation as DataOperation } from '../../reducer/data/data';
import { getAuthorizationStatus } from '../../reducer/user/selectors';

const MyListButton = (props) => {
  const {
    film, isAuthorized, changeFavoriteStatus,
  } = props;
  const { id, isFavorite } = film;

  const handleMyListClick = () => {
    return isAuthorized
      ? changeFavoriteStatus(id, Number(!isFavorite))
      : history.push(AppRoute.LOGIN);
  };

  return (
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
};

MyListButton.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  changeFavoriteStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeFavoriteStatus: (id, status) => dispatch(DataOperation.changeFavoriteStatus(id, status)),
});

export { MyListButton as MyListButtonComponent };
export default connect(mapStateToProps, mapDispatchToProps)(MyListButton);
