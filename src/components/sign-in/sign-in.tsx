import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { LoadingStatus } from '../../const';
import history from '../../history';
import {
  getAuthorizationLoadingStatus,
  getAuthorizationStatus,
} from '../../reducer/user/selectors';
import { Operation as UserOperation } from '../../reducer/user/user';
import { getEmailValidation } from '../../utils/common';
import Footer from '../footer/footer';

interface Props {
  isAuthorized: boolean
  loginUser: (login: string, password: string) => void
  authorizationLoadingStatus: string
}

const SignIn: React.FunctionComponent<Props> = ({
  loginUser, isAuthorized, authorizationLoadingStatus,
}: Props) => {
  const loginInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [login, setLogin] = useState(``);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (isAuthorized) {
      history.goBack();
    }
  });

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    if (getEmailValidation(login)) {
      loginUser(login, passwordInputRef.current.value);
    } else {
      setIsInvalid(true);
    }
  };

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
        <form action="#" className="sign-in__form" onSubmit={formSubmitHandler}>

          {authorizationLoadingStatus === LoadingStatus.ERROR
           && <div className="sign-in__message">
             <p style={{ whiteSpace: `pre-wrap` }}>{`We can’t recognize this email `}{<br/>}
               {`and password combination. Please try again.`}</p>
           </div>}

          {isInvalid
           && <div className="sign-in__message">
             <p style={{ whiteSpace: `pre-wrap` }}>{`Please enter a valid email address`}</p>
           </div>}

          <div className="sign-in__fields">
            <div className={isInvalid ? `sign-in__field sign-in__field--error` : `sign-in__field`}>
              <input className="sign-in__input" type="email" placeholder="Email address"
                     name="user-email" id="user-email" required ref={loginInputRef} onChange={
                (evt) => {
                  setLogin(evt.target.value);
                  setIsInvalid(false);
                }
              }/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email
                address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password"
                     name="user-password" id="user-password" required ref={passwordInputRef}/>
              <label className="sign-in__label visually-hidden"
                     htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit"
                    disabled={authorizationLoadingStatus === LoadingStatus.SENDING}>
              {authorizationLoadingStatus === LoadingStatus.SENDING ? `Sending...` : `Sign In`}
            </button>
          </div>
        </form>
      </div>

      <Footer/>

    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthorizationStatus(state),
  authorizationLoadingStatus: getAuthorizationLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (name, password) => dispatch(UserOperation.loginUser(name, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
