import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import SignupForm from '../../screens/SignupForm';
import LoginForm from '../../screens/LoginForm';
import Home from '../../screens/Home';
import HandleRoute from '../HandleRoute';
import { PATHS } from '../../constants/paths';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <HandleRoute path={PATHS.login}>
          <LoginForm />
        </HandleRoute>
        <HandleRoute path={PATHS.signup}>
          <SignupForm />
        </HandleRoute>
        <HandleRoute exact path={PATHS.root} isPrivate>
          <Home />
        </HandleRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
