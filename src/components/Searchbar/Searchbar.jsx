import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
// import Notiflix from 'notiflix';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default function Searchbar({onSubmit}) {
  const [query, setQuery] = useState('');

  const onChangeInput = evt => {
    setQuery(evt.currentTarget.value.toLowerCase());
  };

  const onSubmitForm = evt => {
    evt.preventDefault();

    if (query.trim() === '') {
      toast.error('Please enter something first to search for images!');
      // Notiflix.Notify.failure(
      // 'Please enter something first to search for images!'
      // );
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.header}>
      <form onSubmit={onSubmitForm} className={css.form}>
        <button type="submit" className={css.button}>
          <ImSearch size={15} />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChangeInput}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};