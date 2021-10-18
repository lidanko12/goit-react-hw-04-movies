import { useHistory, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import s from './BackButton.module.css'


export default function BackButton({ children }) {
const history = useHistory();
const location = useLocation();

const handleGoBackClick = () => {
history.push(location.state.from ?? '/movies');
};

return (
    <button type="button" className={s.backButton} onClick={handleGoBackClick}>
    {children} Previous Page
    </button>
);
}

BackButton.propTypes = {
children: PropTypes.node,
};