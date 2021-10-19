import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import * as Api from '../../../services/ApiService'
import Load from '../../../Loader/Loader';
import s from './Reviews.module.css'


export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('idle');

  const { movieId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setStatus('pending');
    Api.fetchReviews(movieId).then((res) => {
      setReviews(res.results);
    });
    setStatus('resolved');
    handlePageScroll();
  };

  const handlePageScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {status === 'pending' && (
        <Load/>
      )}
      <div className={s.reviews_container}>
        <ul className="ReviewsList">
          {reviews && reviews.length > 0
            ? reviews.map(({ id, author, content, url }) => (
                <li className={s.review_item} key={id}>
                  <h3 className={s.review_title}>Author: {author}</h3>

                  <p className={s.reviews_text}>{content.slice(0, 730)}...</p>
                </li>
              ))
            : "We don't have any reviews for this movie"}
        </ul>
      </div>
      </>
      );
    
}



Reviews.propTypes = {
  movieId: PropTypes.string,
};