import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { BsXLg } from 'react-icons/bs';
import css from './Modal.module.css';

export default function Modal({
  title,
  onClose,
  currentImageUrl,
  currentImageDescription,
}) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleClickBackdrop = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  
  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleClickBackdrop}>
      <div className={css.modal}>
        <div className={css.wrapper}>
          {title && <h1 className={css.title}>{title}</h1>}
          <button className={css.button} type="button" onClick={onClose}>
            <BsXLg className={css.icon} />
          </button>
        </div>
        <img
          src={currentImageUrl}
          alt={currentImageDescription}
          loading="lazy"
        />
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  currentImageUrl: PropTypes.string,
  currentImageDescription: PropTypes.string,
};