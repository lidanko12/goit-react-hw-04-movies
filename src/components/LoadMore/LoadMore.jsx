import PropTypes from 'prop-types';
import s from './LoadMore.module.css'


export default function LoadMoreButton({ onLoadMore }) {
  return (
    <div className={s.buttonWrapper}>
      <button type="button"  onClick={onLoadMore} className={s.loadButton}>
        More Movies
      </button>
    </div>
  );
}

LoadMoreButton.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};