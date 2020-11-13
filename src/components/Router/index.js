import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Signup from '../../screens/Signup';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" />
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
