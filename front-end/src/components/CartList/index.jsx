import React, { useContext, useState, useEffect } from 'react';
import TrybeerContext from '../../context/TrybeerContext';
import CartItem from '../CartItem';

export default function CartList() {
  const { getTotalShoppingCart, shoppingCart } = useContext(TrybeerContext);
  const [totalPriceCart, setTotalPriceCart] = useState(getTotalShoppingCart());

  useEffect(() => {
    setTotalPriceCart(getTotalShoppingCart());
  }, [getTotalShoppingCart]);

  return (
    <div>
      <h2> Produtos </h2>
      <div>
        {shoppingCart.length > 0 && shoppingCart.map((product, index) => (
          <CartItem key={ product.id } product={ product } index={ index } />
        ))}
        {shoppingCart.length === 0 && <h2>Não há produtos no carrinho</h2>}
        <p>
          Total:
          <span data-testid="order-total-value">
            {` R$ ${totalPriceCart.toFixed(2).split('.').join(',')}`}
          </span>
        </p>
      </div>
    </div>
  );
}
