
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
import errorPoster from '../../img/default.png'
import s from './FilmList.module.css'

export default function FilmList({ movies, url, location }) {
  return (
  <>
      <ul className = {s.movieList}>
        {movies.map(({ id, title, poster_path, release_date }) => (
          <li key={id}
          className ={s.movieList_elem}>
            <NavLink className ={s.movieCardLink}
              to={{
                pathname: `${url}/${id}`,
                state: { from: location },
              }}
            >
            <div className={s.movie_card}>
              <img
                className={s.poster}
                src={poster_path ? `https://image.tmdb.org/t/p/w300` + poster_path: errorPoster}
        alt={title}
      />
      <div className='movie-details'>
                <h2>{title}</h2>
            {release_date && <span> ({release_date.slice(0,4)})</span>}
      </div>
    </div>
    </NavLink>
  </li>
        ))}
      </ul>
      </>
)
}

FilmList.propTypes = {
  movies: PropTypes.array,
};