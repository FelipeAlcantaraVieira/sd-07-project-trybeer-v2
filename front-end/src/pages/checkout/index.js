import React from 'react';
import './style.css';

import { CartList, CartForm, TopMenu } from '../../components';

export default function Checkout() {
  return (
    <div className="checkout-container">
      <TopMenu topTitle="Finalizar Pedido" />
      <CartList />
      <CartForm />
    </div>
  );
}
