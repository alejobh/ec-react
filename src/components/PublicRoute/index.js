import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isLoggedIn } from '../../services/userService';

function PublicRoute({ children, ...rest }) {
  const isLogged = isLoggedIn();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogged ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}

export default PublicRoute;
