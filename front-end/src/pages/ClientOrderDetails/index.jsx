import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import ClientOrderDetails from '../../components/ClientOrderDetails';
import AuthVerification from '../../components/AuthVerification';
import './orderDetails.css';

const ClientOrderDetailsPage = () => {
  AuthVerification();

  return (
    <div className="order-details">
      <Header title="Detalhes do Pedido" />
      <Container style={ { height: '100vh' } }>
        <ClientOrderDetails />
      </Container>
    </div>
  );
};

export default ClientOrderDetailsPage;
