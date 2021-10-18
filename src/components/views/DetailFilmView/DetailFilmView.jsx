import FilmCard from "../../FilmCard/FilmCard";
import { useEffect, useState,lazy,Suspense } from "react";
import { useRouteMatch } from "react-router-dom";
import { Route } from 'react-router-dom';
import Load from "../../Loader/Loader";

// import Reviews from "./Reviews";
// import Cast from './Cast'
import *as Api from '../../services/ApiService'

const Cast = lazy(() =>
  import('./Cast' /* webpackChunkName: "cast-page" */)
);
const Reviews = lazy(() =>
  import('./Reviews' /* webpackChunkName: "reviews-page" */)
);
// import Load from '../../Loader/Loader'

export default function DetailFilmView() {
    const [movie, setMovie] = useState(null);
    const [status, setStatus] = useState('idle');
    const { path } = useRouteMatch();
    const match = useRouteMatch();
    const { movieId } = match.params;


useEffect(() => {
    getFilmData();
}, []);
    
    const getFilmData = () => {
    setStatus('pending');
    Api.getMovieById(movieId).then((response) => {
    setMovie(response);
    });
    setStatus('resolved');
}; 


    return (
        <>
        {movie && <FilmCard movie={movie} />}
        <hr />
    <Suspense fallback={<Load />}>
        <Route exact path={`${path}/cast`}>
        {movie && <Cast />}
        </Route>
            {
                <Route exact path={`${path}/reviews`}>
        {movie && <Reviews />}
        </Route> }
    </Suspense>
        </>
) 
}
