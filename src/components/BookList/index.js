import React, { useEffect } from 'react';
import { t } from 'i18next';
import { Link } from 'react-router-dom';

import { PATHS } from '../../constants/paths';
import { getBooks } from '../../services/bookService';
import { getAuthData } from '../../services/userService';
import useRequest from '../../app/hooks/useRequest';
import Book from '../Book';

import styles from './styles.module.scss';

function BookList() {
  const [isLoading, submitError, response, sendRequest] = useRequest({
    request: getBooks
  });

  useEffect(() => {
    if (!response) {
      sendRequest(getAuthData());
    }
  }, [response, sendRequest, submitError]);

  const books = response && response.data && response.data.page ? response.data.page : [];

  return (
    <div className={styles.bookList}>
      {isLoading && <p data-testid="loading">{t('General:loadingContent')}...</p>}
      {books.map(book => (
        <Link to={PATHS.bookDetail.replace(':bookId', book.id)} key={book.id}>
          <Book book={book} />
        </Link>
      ))}
    </div>
  );
}

export default BookList;
