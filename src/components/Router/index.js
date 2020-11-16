import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Signup from '../../screens/Signup';
import Login from '../../screens/Login';
import Home from '../../screens/Home';
import { PATHS } from '../../constants/paths';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={PATHS.login} component={Login} />
        <Route path={PATHS.signup} component={Signup} />
        <Route exact path={PATHS.root} component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
