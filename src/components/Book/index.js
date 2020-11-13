import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function Book({ book }) {
  return (
    <div className={styles.book}>
      <img src={book.imageUrl} alt={book.title} />
      <span>{book.title}</span>
      <span>{book.author}</span>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    author: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string
  })
};

export default Book;
