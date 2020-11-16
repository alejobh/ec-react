import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isLoggedIn } from '../../services/userService';

function PrivateRoute({ children, ...rest }) {
  const isLogged = isLoggedIn();
  console.log(isLogged);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
