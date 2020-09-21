import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import history from '../history';
import { AppRoute } from '../const';
import { Operation } from '../reducer/data/data';
import { getAuthorizationStatus } from '../reducer/user/selectors';
import { getFilms } from '../reducer/data/selectors';

const withFavoriteButton = (Component) => {
  class WithFavoriteButton extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isFavorite: this.film.isFavorite,
      };

      this.film = props.selectedFilm || props.promoFilm;
    }

    render() {
      return (
        <Component
          {...this.props}
          renderMyListButton={this._renderMyListButton}/>
      );
    }

    _handleMyListClick = () => {
      const { id, isFavorite } = this.film;
      return this.props.isAuthorized
        ? this.props.changeFavoriteStatus(id, Number(!isFavorite))
        : history.push(AppRoute.LOGIN);
    };

    _renderMyListButton = () => {
      const { isFavorite } = this.film;
      return (
        <button
          className="btn btn--list movie-card__button"
          type="button"
          onClick={this._handleMyListClick}
        >

          {
            isFavorite && this.props.isAuthorized ? (
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
  }

  WithFavoriteButton.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    selectedFilm: PropTypes.object,
    promoFilm: PropTypes.object,
    changeFavoriteStatus: PropTypes.func.isRequired,
  };

  return WithFavoriteButton;
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthorizationStatus(state),
  films: getFilms(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeFavoriteStatus: (id, status) => dispatch(Operation.changeFavoriteStatus(id, status)),
});

export { withFavoriteButton };
export default (Component) => connect(
  mapStateToProps, mapDispatchToProps,
)(withFavoriteButton(Component));
