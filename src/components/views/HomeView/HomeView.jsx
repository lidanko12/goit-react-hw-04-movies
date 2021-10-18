import { useState, useEffect } from "react"
import FilmList from "../../FilmList/FilmList"
import * as Api from '../../services/ApiService'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import LoadMoreButton from "../../LoadMore/LoadMore";
import Load from '../../Loader/Loader';


export default function HomeView() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');

    
  useEffect(() => {
    getTrendFilm();
  }, []);

  const getTrendFilm = () => {
    setStatus('pending');

    Api.getTrendMovies(page).then((res) => {
    const data = res.results;
    setMovies((prev) => [...prev, ...data]);
    });
    setPage((prev) => prev + 1);

    if (page !== 1) {
    handlePageScroll();
    }
    setStatus('resolved');
  };

  const loadMoreHandler = () => {
    getTrendFilm();
    
  };

  const handlePageScroll = () => {
    window.scrollTo({
      left: 0,
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const showLoadMore = movies.length >=19

return (
    <>
      {status === 'pending' && (
        <Load/>
      )}
      {movies ? (
        <FilmList movies={movies} url={'movies'} location={'/'} />
      ) : (
        <h2>Error getting movies</h2>
      )}
      {showLoadMore && <LoadMoreButton onLoadMore={loadMoreHandler} />}
    </>
  );
}
