import * as React from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import { AppRoute } from '../../const';
import { Operation as DataOperation } from '../../reducer/data/data';
import { getAuthorizationStatus } from '../../reducer/user/selectors';
import { Film } from '../../types';

interface Props {
  isAuthorized: boolean
  film: Film
  changeFavoriteStatus: (id: number, isFavorite: number) => void
}

const MyListButton:React.FunctionComponent<Props> = (props: Props) => {
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

const mapStateToProps = (state) => ({
  isAuthorized: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeFavoriteStatus: (id, status) => dispatch(DataOperation.changeFavoriteStatus(id, status)),
});

export { MyListButton as MyListButtonComponent };
export default connect(mapStateToProps, mapDispatchToProps)(MyListButton);
