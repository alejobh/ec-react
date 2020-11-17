import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';

import BookDetail from '../../components/BookDetail';
import { BookDetailContext } from '../../contexts/bookDetailContext';
import { getBookDetail } from '../../services/bookService';
import useRequest from '../../app/hooks/useRequest';

function Books({ match }) {
  const [isLoading, submitError, response] = useRequest({
    request: getBookDetail,
    payload: match.params.bookId
  });

  const bookDetail = response && response.ok ? response.data : {};
  return (
    <BookDetailContext.Provider value={bookDetail}>
      {isLoading && <p>{t('General:loadingContent')}...</p>}
      {submitError && submitError.length > 0 && <p>{t('Errors:apiError')}</p>}
      {!isLoading && !submitError && <BookDetail />}
    </BookDetailContext.Provider>
  );
}

Books.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      bookId: PropTypes.string.isRequired
    })
  })
};

export default Books;
