import * as React from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import { getFilms } from '../../reducer/data/selectors';
import { getUserInfo } from '../../reducer/user/selectors';
import { Operation as UserOperation } from '../../reducer/user/user';
import { Film, UserData } from '../../types';
import FilmsList from '../films-list/films-list';
import Footer from '../footer/footer';

interface Props {
  userInfo: UserData
  films: Film[]
  logoutUser: () => void
}

const UserPage: React.FunctionComponent<Props> = ({ userInfo, films, logoutUser }: Props) => {
  const favoriteFilms = films.filter((film) => film.isFavorite);
  const { avatar, name } = userInfo;

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

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src={avatar} alt="User avatar" width="63" height="63"/>
          </div>
        </div>
        <p style={{ marginLeft: `20px` }}>{name}</p>
        <p onClick={logoutUser} style={{
          marginLeft: `20px`,
          cursor: `pointer`,
        }}>Logout</p>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={favoriteFilms}/>

      </section>

      <Footer/>

    </div>
  );
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  userInfo: getUserInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(UserOperation.logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
