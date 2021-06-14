import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import ClientProfilePage from '../../pages/ClientProfile';
import AdminProfilePage from '../../pages/AdminProfile';
import Products from '../../pages/Products';
import AdminOrdersPage from '../../pages/AdminOrders';
import ClientOrdersPage from '../../pages/ClientOrders';
import ClientOrderDetailsPage from '../../pages/ClientOrderDetails';
import AdminOrderDetailsPage from '../../pages/AdminOrdersDetails';
import Checkout from '../../pages/Checkout';
import ClientChatPage from '../../pages/ClientChat';
import AdminChatsListPage from '../../pages/AdminChatsList';
import AdminChatPage from '../../pages/AdminChat';

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/profile" component={ ClientProfilePage } />
      <Route path="/chat" component={ ClientChatPage } />
      <Route path="/orders/:id" component={ ClientOrderDetailsPage } />
      <Route exact path="/orders" component={ ClientOrdersPage } />
      <Route path="/admin/profile" component={ AdminProfilePage } />
      <Route path="/products" component={ Products } />
      <Route path="/checkout" component={ Checkout } />
      <Route path="/admin/orders/:id" component={ AdminOrderDetailsPage } />
      <Route path="/admin/orders" component={ AdminOrdersPage } />
      <Route path="/admin/chats/user" component={ AdminChatPage } />
      <Route path="/admin/chats" component={ AdminChatsListPage } />
    </Switch>
  );
}

export default AppRoutes;
