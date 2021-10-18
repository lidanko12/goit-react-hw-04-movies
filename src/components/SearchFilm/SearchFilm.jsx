import { useState } from 'react';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import s from './SearchFilm.module.css'


export default function SearchFilm({ searchHandler }) {
const [text, setText] = useState('');

const handleInput = (event) => {
    const { value } = event.target;
    setText(value);
};

const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim() === '') {
    toast.error('Nothing found');
    return;
    }

    searchHandler(text);
    reset();
};

const reset = () => {
    setText('');
};

return (
    <>
    <form onSubmit={handleSubmit}>
        <label>
        <input
            className ={s.input}
            type="text"
            name="movie"
            placeholder="Enter movie name..."
            autoComplete="off"
            onChange={handleInput}
            value={text}
        />
        </label>
        <button type="submit" className={s.inputButton}>
        Search Movies
        </button>
    </form>
    <ToastContainer transition={Zoom} autoClose={3000} />
    </>
);
}

SearchFilm.propTypes = {
searchHandler: PropTypes.func,
};