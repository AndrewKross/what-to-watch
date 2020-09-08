import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ActionCreator as AppStateActionCreator } from '../../reducer/app-state/app-state';

const ShowMore = ({ onShowMoreButtonClick }) => (
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

ShowMore.propTypes = {
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

export { ShowMore as ShowMoreComponent };
export default connect(null, mapDispatchToProps)(ShowMore);
