import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { isLoggedIn } from '../../services/userService';
import { PATHS } from '../../constants/paths';

function HandleRoute({ children, isPrivate = false, ...rest }) {
  const isLogged = isLoggedIn();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!isLogged && isPrivate) {
          return (
            <Redirect
              to={{
                pathname: PATHS.login,
                state: { from: location }
              }}
            />
          );
        }
        if (isLogged && !isPrivate) {
          return (
            <Redirect
              to={{
                pathname: PATHS.root,
                state: { from: location }
              }}
            />
          );
        }
        return children;
      }}
    />
  );
}

HandleRoute.propTypes = {
  isPrivate: PropTypes.bool
};

export default HandleRoute;
