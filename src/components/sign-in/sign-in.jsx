import React, { useEffect, useRef } from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Operation as UserOperation } from '../../reducer/user/user';
import { getAuthorizationStatus } from '../../reducer/user/selectors';

const SignIn = ({ history, loginUser, isAuthorized }) => {
  const loginInputRef = useRef(``);
  const passwordInputRef = useRef(``);

  useEffect(() => {
    if (isAuthorized) {
      history.goBack();
    }
  });

  return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <a href="#" onClick={history.goBack} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form">
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input className="sign-in__input" type="email" placeholder="Email address"
                       name="user-email" id="user-email" ref={loginInputRef} required/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email
                  address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password"
                       name="user-password" id="user-password" ref={passwordInputRef} required/>
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit" onClick={((evt) => {
                loginUser(loginInputRef.current.value, passwordInputRef.current.value);
                evt.preventDefault();
              })}>Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <a href="#" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (name, password) => dispatch(UserOperation.loginUser(name, password)),
});

SignIn.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
