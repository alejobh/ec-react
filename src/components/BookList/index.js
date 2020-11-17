import React from 'react';
import { t } from 'i18next';

import { getBooks } from '../../services/bookService';
import useRequest from '../../app/hooks/useRequest';
import Book from '../Book';

import styles from './styles.module.scss';

function BookList() {
  const [isLoading, submitError, response] = useRequest({
    request: getBooks
  });

  const books = response && response.data && response.data.page ? response.data.page : [];

  return (
    <div className={styles.bookList}>
      {submitError && submitError.length > 0 && <p>{t('Errors:apiError')}</p>}
      {isLoading && <p data-testid="loading">{t('General:loadingContent')}...</p>}
      {books.map(book => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookList;
