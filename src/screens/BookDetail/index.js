import React from 'react';
import clsx from 'clsx';
import { Link, useParams } from 'react-router-dom';
import { t } from 'i18next';

import { getBookDetail } from '../../services/bookService';
import useRequest from '../../app/hooks/useRequest';
import { PATHS } from '../../constants/paths';
import btnBack from '../../app/assets/btn-back.png';

import styles from './styles.module.scss';

function BookDetail() {
  const { bookId } = useParams();
  const [isLoading, submitError, response] = useRequest({
    request: getBookDetail,
    payload: bookId
  });

  const book = response?.ok ? response.data : {};

  return (
    <>
      {response && !response.ok && <p>{t('Errors:apiError')}</p>}
      {submitError && <p>{submitError}</p>}
      {isLoading && <p>{t('General:loadingContent')}...</p>}
      {!isLoading && response?.ok && (
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
              <h1 className={clsx(styles.title, 'm-bottom-3')}>{book.title}</h1>
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
      )}
    </>
  );
}

export default BookDetail;
