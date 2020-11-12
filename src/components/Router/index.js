import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Signup from '../../screens/Signup';
import Login from '../../screens/Login';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
