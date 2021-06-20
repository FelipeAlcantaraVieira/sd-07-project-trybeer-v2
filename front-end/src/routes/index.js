import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import {
  Login,
  Register,
  Orders,
  ProfileClient,
  Products,
  AdminOrders,
  ProfileAdmin,
  detailsAdmin,
  Checkout,
  ClientDetails,
  Chat,
  ChatsAdmin,
  ChatAdmin,
} from '../pages';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/login" />
    </Route>
    <Route exact path="/login" component={ Login } />
    <Route exact path="/register" component={ Register } />
    <PrivateRoute exact path="/orders" component={ Orders } />
    <PrivateRoute exact path="/profile" component={ ProfileClient } />
    <PrivateRoute exact path="/products" component={ Products } />
    <PrivateRoute exact path="/admin/orders" component={ AdminOrders } />
    <PrivateRoute exact path="/admin/orders/:id" component={ detailsAdmin } />
    <PrivateRoute exact path="/admin/profile" component={ ProfileAdmin } />
    <PrivateRoute exact path="/checkout" component={ Checkout } />
    <PrivateRoute exact path="/orders/:np" component={ ClientDetails } />
    <PrivateRoute exact path="/chat" component={ Chat } />
    <PrivateRoute exact path="/admin/chats" component={ ChatsAdmin } />
    <PrivateRoute exact path="/admin/chats/chat" component={ ChatAdmin } />
  </Switch>
);

export default Routes;
