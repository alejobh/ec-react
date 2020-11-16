import React from 'react';
import { useHistory } from 'react-router-dom';
import { t } from 'i18next';

import NavBar from '../../components/NavBar';
import BookList from '../../components/BookList';
import { clearSession } from '../../services/userService';

function Books() {
  const history = useHistory();

  const links = [
    {
      name: t('Home:linkLogout'),
      onClick: () => {
        clearSession();
        history.push('/login');
      }
    }
  ];

  return (
    <div>
      <NavBar links={links} />
      <BookList />
    </div>
  );
}

export default Books;
