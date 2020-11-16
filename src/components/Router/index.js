import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Signup from '../../screens/Signup';
import Login from '../../screens/Login';
import Books from '../../screens/Books';
import Home from '../../screens/Home';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import { PATHS } from '../../constants/paths';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path={PATHS.bookDetail} component={Books} />
        <PublicRoute path={PATHS.login} component={Login} />
        <PublicRoute path={PATHS.signup} component={Signup} />
        <PrivateRoute path={PATHS.root} component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
