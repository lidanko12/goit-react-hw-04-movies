import { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import SearchFilm from '../../SearchFilm';
import Load from '../../Loader/Loader';
import * as Api from '../../services/ApiService'
import FilmList from '../../FilmList/FilmList';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';
import LoadMoreButton from '../../LoadMore/LoadMore';


export default function FilmView() {
const history = useHistory();
const location = useLocation();
const { url } = useRouteMatch();
const text = new URLSearchParams(location.search).get('text');

const [userQuery, setUserQuery] = useState(text ?? '');
const [movies, setMovies] = useState([]);
const [status, setStatus] = useState('idle');
const [page, setPage] = useState(1);

useEffect(() => {
    if (!userQuery) return;
    getData();
}, [userQuery]);

const getData = () => {
    if (userQuery.trim() === '') {
    toast.error('Nothing found, repeat search!');
    return;
    }
    setStatus('pending');
    Api.getMovieSearch(userQuery,page).then((res) => {
    const data = res.results;
        
    if (data.length < 1) {
        toast.error(`Sorry, nothing to show `);
    }
    setMovies((prev) => [...prev, ...data]);
    });
    setPage((prev) => prev + 1);
    setStatus('resolved');

    if (page !== 1) {
    handlePageScroll();
    }
};

    const handleQuery = (newQuery) => {
    if (newQuery === userQuery) return;
    setUserQuery(newQuery);
    setMovies([]);
    setPage(1);

    history.push({
    ...location,
    search: `text=${newQuery}`,
    });
    };
    const showLoadMore = movies.length > 0 && movies.length >= 19;
    
    const loadMore = () => {
    getData();
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
    <SearchFilm searchHandler={handleQuery} />
        <FilmList movies={movies} url={url} location={location} />
        {showLoadMore && <LoadMoreButton onLoadMore={loadMore} />}
    <ToastContainer transition={Zoom} autoClose={3000} />
    </>
);
}
