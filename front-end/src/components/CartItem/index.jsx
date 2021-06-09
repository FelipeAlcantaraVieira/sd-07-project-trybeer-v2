import React, { useContext, useState } from 'react';
import TrybeerContext from '../../context/TrybeerContext';

export default function CartList(props) {
  const { dispatchShoppingCart } = useContext(TrybeerContext);
  const [cartListProps] = useState(props);
  const { product: { quantity, price, name, id }, index } = cartListProps;
  return (
    <div>
      <span data-testid={ `${index}-product-qtd-input` }>{ quantity }</span>
      <span data-testid={ `${index}-product-name` }>{ ` ${name} ` }</span>
      <span data-testid={ `${index}-product-total-value` }>
        { ` R$ ${(quantity * parseFloat(price)).toFixed(2).split('.').join(',')} ` }
      </span>
      <span data-testid={ `${index}-product-unit-price` }>
        { ` (R$ ${parseFloat(price).toFixed(2).split('.').join(',')} un) ` }
      </span>
      <button
        type="button"
        data-testid={ `${index}-removal-button` }
        onClick={ () => dispatchShoppingCart({
          type: 'delProduct',
          payload: { id },
        }) }
      >
        X
      </button>
    </div>
  );
}
