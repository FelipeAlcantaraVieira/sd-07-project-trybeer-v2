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
    <div className="cart-list-container">
      <div className="checkout-card-container">
        {shoppingCart.length === 0 && (
          <h2 className="error">Não há produtos no carrinho</h2>
        )}
        {shoppingCart.length > 0
          && shoppingCart.map((product, index) => (
            <CartItem key={ product.id } product={ product } index={ index } />
          ))}
      </div>
      {/* <h2 className='checkout-total-price'>
        Total:
        <span data-testid='order-total-value'>
          {` R$ ${totalPriceCart.toFixed(2).split('.').join(',')}`}
        </span>
      </h2> */}
    </div>
  );
}
