import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function BookDetail({ book }) {
  return (
    <div className={styles.book}>
      <img className={styles.img} src={book.imageUrl} alt={book.title} />
      <span className={styles.title}>{book.title}</span>
      <span>{book.author}</span>
    </div>
  );
}

BookDetail.propTypes = {
  book: PropTypes.shape({
    author: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string
  })
};

export default BookDetail;
