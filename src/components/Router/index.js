import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import SignupForm from '../../screens/SignupForm';
import LoginForm from '../../screens/LoginForm';
import BookDetail from '../../screens/BookDetail';
import Home from '../../screens/Home';
import HandleRoute from '../HandleRoute';
import { PATHS } from '../../constants/paths';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <HandleRoute path={PATHS.bookDetail} component={BookDetail} isPrivate />
        <HandleRoute path={PATHS.login} component={LoginForm} />
        <HandleRoute path={PATHS.signup} component={SignupForm} />
        <HandleRoute exact path={PATHS.root} component={Home} isPrivate />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
