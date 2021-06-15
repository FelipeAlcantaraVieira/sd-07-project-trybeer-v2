import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import CheckoutCart from '../../components/CheckoutCart';
import AuthVerification from '../../components/AuthVerification';
import './checkout.css';

const Checkout = () => {
  AuthVerification();

  return (
    <div className="checkout">
      <Header title="Finalizar Pedido" />
      <Container
        style={ {
          height: 'auto' } }
      >
        <CheckoutCart />
      </Container>
    </div>
  );
};

export default Checkout;
