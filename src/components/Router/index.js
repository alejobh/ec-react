import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignupForm from '../../screens/SignupForm';
import LoginForm from '../../screens/LoginForm';
import Home from '../../screens/Home';
import { PATHS } from '../../constants/paths';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={PATHS.login} component={LoginForm} />
        <Route path={PATHS.signup} component={SignupForm} />
        <Route exact path={PATHS.root} component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
