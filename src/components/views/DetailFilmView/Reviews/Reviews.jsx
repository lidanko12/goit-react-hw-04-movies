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
      
      {reviews.length !== 0 && (
        <div className= {s.reviews_container}>
          <h3 style={{ textAlign: 'center' }}>
            Popular Reviews for this movie:
          </h3>
          <ul className="reviewsList">
            {reviews.map(({ id, author, content, url }) => (
              <li key={id} className={s.reviews_item}>
                <h3  className={s.reviews_title}>
                {author} :
                </h3>
                <p className={s.review_text}>{content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

Reviews.propTypes = {
  movieId: PropTypes.string,
};