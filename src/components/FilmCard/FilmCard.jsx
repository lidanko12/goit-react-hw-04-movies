import PropTypes from 'prop-types';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import BackButton from '../BackButton';
import s from './FilmCard.module.css'

export default function FilmCard({ movie }) {
    const {release_date, vote_average, overview, title, genres,poster_path } = movie;
    const { url } = useRouteMatch();
    const location = useLocation();

    const posterUrl = `https://image.tmdb.org/t/p/w300${poster_path}`

    return (
        <>
            <BackButton />
            <article className = {s.movieArticle}>
                <div className = {s.posterThumb}>
                    <img src={posterUrl} alt={title}
                        title={title}
                    className={s.poster}
                    />
                </div>
                <div className = {s.infoContainer}>
                    {title && (<h1 className ={s.movieTitle}>
                        {title}{''}{release_date ? (
                            <span>({release_date.substring(0, 4)})</span>
                        ) : (
                            <span>(n/a)</span>
                        )}
                    </h1>    
                    )}
                    <div className={s.score}>
            {vote_average ? (
            <p className={s.vote}>Average Vote: {vote_average} </p>
            ) : null}
        </div>

        <div>
            <p className={s.label}>Overview: </p>
            {overview ? <span className={s.text}>{overview}</span> : <span>n/a</span>}
        </div>

        <p className={s.label}>Genres:</p>

        {genres.length > 0 ? (
            <ul className={s.genresList}>
            {genres.map(({ id, name }) => (
                <li key={id} className={s.genreList_item}>
                <span>{name}</span>
                </li>
            ))}
            </ul>
        ) : (
            <span>n/a</span>
        )}
                </div>
            </article>
            <div className={s.additionalInfoThumb}>
        <div className={s.addOnsLinks}>
          <Link className={s.showAddonLink}
            to={{
              pathname: `${url}/cast`,
              state: { from: location.state ? location.state.from : '/' },
                        }}
                    >
            Cast
          </Link>
          <Link className={s.showAddonLink}
            to={{
              pathname: `${url}/reviews`,
              state: { from: location.state ? location.state.from : '/' },
            }}
          > Reviews
          </Link>
        </div>
      </div>
            </>
    )

    
};
