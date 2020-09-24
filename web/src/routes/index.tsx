import React from 'react';

import { Switch, BrowserRouter } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';
import CreateTransaction from '../pages/CreateTransaction';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './Private/PrivateRoute';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/" exact component={Dashboard} isPrivate={true}/>
      <PrivateRoute path="/create" component={CreateTransaction} isPrivate={true}/>
      <PrivateRoute path="/import" component={Import} isPrivate={true}/>
      <PrivateRoute path="/login" exact component={Login}/>
      <PrivateRoute path="/register" exact component={Register}/>
    </Switch>
  </BrowserRouter>
);

export default Routes;
