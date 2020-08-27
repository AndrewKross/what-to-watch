import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ActionCreator } from '../../reducer/reducer';

const ShowMore = ({ onShowMoreButtonClick }) => (
  <div className="catalog__more">
    <button className="catalog__button"
            type="button"
            onClick={onShowMoreButtonClick}>
      Show more
    </button>
  </div>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick: () => dispatch(ActionCreator.showMoreFilms()),
});

ShowMore.propTypes = {
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

export { ShowMore as ShowMoreComponent };
export default connect(mapStateToProps, mapDispatchToProps)(ShowMore);
