import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { getAuthorizationStatus } from '../../reducer/user/selectors';
import { AppRoute } from '../../const';

const Header = ({ isAuthorized }) => {
  const userBlockMarkup = (isUserAuthorized) => {
    if (isUserAuthorized) {
      return (
        <div className="user-block__avatar">
          <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      );
    }
    return (
        <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
    );
  };
  return (
  <header className="page-header movie-card__head">
    <div className="logo">
      <a href="/" className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>

    <div className="user-block">

      {userBlockMarkup(isAuthorized)}

    </div>
  </header>
  );
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthorizationStatus(state),
});

Header.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Header);
