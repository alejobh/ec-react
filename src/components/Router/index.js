import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import SignupForm from '../../screens/SignupForm';
import LoginForm from '../../screens/LoginForm';
import Home from '../../screens/Home';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import { PATHS } from '../../constants/paths';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path={PATHS.login}>
          <LoginForm />
        </PublicRoute>
        <PublicRoute path={PATHS.signup}>
          <SignupForm />
        </PublicRoute>
        <PrivateRoute exact path={PATHS.root}>
          <Home />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
