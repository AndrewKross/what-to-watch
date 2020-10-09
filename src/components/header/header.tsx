import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import history from '../../history';
import { getAuthorizationStatus, getUserInfo } from '../../reducer/user/selectors';
import { UserData } from '../../types';

interface Props {
  isAuthorized: boolean
  userInfo: UserData
  children: React.ReactNode
}

const Header: React.FunctionComponent<Props> = ({
  isAuthorized, userInfo, children,
}: Props) => {
  const userBlockMarkup = (isUserAuthorized) => {
    if (isUserAuthorized) {
      return (
        <div className="user-block__avatar"
             onClick={() => history.push(AppRoute.MY_LIST)}
             style={{ cursor: `pointer` }}>
          <img src={userInfo.avatar} alt="User avatar" width="63" height="63"/>
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
        <Link to={AppRoute.MAIN} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {children}

      <div className="user-block">

        {userBlockMarkup(isAuthorized)}

      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthorizationStatus(state),
  userInfo: getUserInfo(state),
});

export default connect(mapStateToProps)(Header);
