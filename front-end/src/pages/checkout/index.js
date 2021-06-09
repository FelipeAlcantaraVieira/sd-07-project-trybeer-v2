import React from 'react';

import { CartList, CartForm, TopMenu } from '../../components';

export default function Checkout() {
  return (
    <div>
      <TopMenu topTitle="Finalizar Pedido" />
      <CartList />
      <CartForm />
    </div>
  );
}
