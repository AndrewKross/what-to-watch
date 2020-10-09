import * as React from 'react';
import { connect } from 'react-redux';
import { ActionCreator as AppStateActionCreator } from '../../reducer/app-state/app-state';

interface Props {
  onShowMoreButtonClick: () => void
}

const ShowMore: React.FunctionComponent<Props> = ({ onShowMoreButtonClick }: Props) => (
  <div className="catalog__more">
    <button className="catalog__button"
            type="button"
            onClick={onShowMoreButtonClick}>
      Show more
    </button>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick: () => dispatch(AppStateActionCreator.showMoreFilms()),
});

export { ShowMore as ShowMoreComponent };
export default connect(null, mapDispatchToProps)(ShowMore);
