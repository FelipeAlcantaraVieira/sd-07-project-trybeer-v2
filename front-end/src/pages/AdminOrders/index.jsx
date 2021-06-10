import React from 'react';
import AdminOrders from '../../components/AdminOrders';
import Header from '../../components/Header';
import AuthVerification from '../../components/AuthVerification';
import './orders.css';

const AdminOrdersPage = () => {
  AuthVerification();

  return (
    <div className="orders">
      <Header title="Pedidos Pendentes" />
      <AdminOrders />
    </div>
  );
};

export default AdminOrdersPage;
