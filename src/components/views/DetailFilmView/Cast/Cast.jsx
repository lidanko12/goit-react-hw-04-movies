import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import * as Api from '../../../services/ApiService'
import Load from '../../../Loader/Loader';
import PropTypes from 'prop-types';
import s from './Cast.module.css'
import errorPoster from '../../../../img/default.png'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';


export default function Cast() {
  const [actors, setActors] = useState([]);
  const [status, setStatus] = useState('idle');

  const { movieId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setStatus('pending');
    Api.fetchCast(movieId).then(res => {
    setActors(res.cast);
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
      {status === 'pending' && <Load />}

    
      {actors && (
        <div className={s.castThumb}>
          <ul className={s.castList}>
            {actors.map(({ id, name, profile_path }) => (
              <li key={id} className={s.castList__item}>
                <img
                  src={
                    profile_path ?
                      `https://image.tmdb.org/t/p/w300` + profile_path
                      : errorPoster
                  }
                  alt={name}
                />
                <span className={s.cast-name}>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

Cast.propTypes = {
movieId: PropTypes.string,
};
