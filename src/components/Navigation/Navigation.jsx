import { NavLink } from "react-router-dom";
import s from './Navigation.module.css'

export default function Navigation() {
    return (
        <nav>
        <NavLink to='/' className={s.link} activeClassName={s.activeLink} exact>Home</NavLink>
        <NavLink to='/movies' className ={s.link} activeClassName ={s.activeLink}>Movies</NavLink>
        </nav>
    )
}
