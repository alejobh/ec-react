import React, { useContext } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { t } from 'i18next';

import { PATHS } from '../../constants/paths';
import btnBack from '../../app/assets/btn-back.png';
import { BookDetailContext } from '../../contexts/bookDetailContext';

import styles from './styles.module.scss';

function BookDetail() {
  const book = useContext(BookDetailContext);

  return (
    <div className="column center">
      <div className={clsx(styles.options, 'row', 'middle')}>
        <img src={btnBack} />
        <Link to={PATHS.root}>
          <span className={styles.option}>{t('General:back')}</span>
        </Link>
      </div>
      <div className={clsx(styles.book, 'row', 'space-around')}>
        <img className={styles.img} src={book.imageUrl} alt={book.title} />
        <div className={clsx(styles.description, 'column')}>
          <h1 className={styles.title}>{book.title}</h1>
          <div className={styles.item}>
            {t('BookDetail:labelAuthor')}: <p className={styles.value}>{book.author}</p>
          </div>
          <div className={styles.item}>
            {t('BookDetail:labelEditor')}: <p className={styles.value}>{book.editor}</p>
          </div>
          <div className={styles.item}>
            {t('BookDetail:labelYear')}: <p className={styles.value}>{book.year}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
