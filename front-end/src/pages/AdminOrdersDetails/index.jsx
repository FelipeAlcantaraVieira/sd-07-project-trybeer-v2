import React from 'react';
import { Container } from 'react-bootstrap';
import AdminOrdersDetails from '../../components/AdminOrdersDetails';
// import Header from '../../components/Header';
import AuthVerification from '../../components/AuthVerification';
import './orderDetails.css';

const AdminOrdersDetailsPage = () => {
  AuthVerification();

  return (
    <div className="order-details">
      <Container style={ { height: '100vh' } }>
        <AdminOrdersDetails />
      </Container>
    </div>
  );
};

export default AdminOrdersDetailsPage;
