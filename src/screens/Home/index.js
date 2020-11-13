import React from 'react';
import { useHistory } from 'react-router-dom';

import NavBar from '../../components/NavBar';
import { clearSession } from '../../services/userService';

function Home() {
  const history = useHistory();

  const links = [
    {
      name: 'Logout',
      onClick: () => {
        clearSession();
        history.push('/login');
      }
    }
  ];

  return <NavBar links={links} />;
}

export default Home;
