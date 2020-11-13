import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isLoggedIn } from '../../services/userService';

function PublicRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn() ? (
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
