import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { isLoggedIn } from '../../services/userService';
import { PATHS } from '../../constants/paths';

function HandleRoute({ component: Component, isPrivate = false, ...rest }) {
  const isLogged = isLoggedIn();
  return (
    <Route
      {...rest}
      render={props => {
        if (!isLogged && isPrivate) {
          return (
            <Redirect
              to={{
                pathname: PATHS.login,
                // eslint-disable-next-line react/prop-types
                state: { from: props.location }
              }}
            />
          );
        }
        if (isLogged && !isPrivate) {
          return (
            <Redirect
              to={{
                pathname: PATHS.root,
                // eslint-disable-next-line react/prop-types
                state: { from: props.location }
              }}
            />
          );
        }
        return <Component {...rest} {...props} />;
      }}
    />
  );
}

HandleRoute.propTypes = {
  component: PropTypes.func,
  isPrivate: PropTypes.bool
};

export default HandleRoute;
