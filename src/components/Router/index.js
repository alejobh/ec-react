import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Signup from '../../screens/Signup';
import Login from '../../screens/Login';
import Home from '../../screens/Home';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute path="/signup">
          <Signup />
        </PublicRoute>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
