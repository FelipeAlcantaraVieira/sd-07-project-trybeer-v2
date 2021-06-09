import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function ShowCartButton(props) {
  const [showCartPropsState, setShowCartPropsState] = useState(props);
  const { totalPrice } = showCartPropsState;
  const history = useHistory();

  useEffect(() => {
    setShowCartPropsState(props);
  }, [props]);

  return (
    <button
      type="button"
      data-testid="checkout-bottom-btn"
      onClick={ () => history.push('/checkout') }
      disabled={ parseFloat(totalPrice) === 0 }
    >
      {'Ver Carrinho '}
      <span data-testid="checkout-bottom-btn-value">
        { `R$ ${Number.parseFloat(totalPrice).toFixed(2).split('.').join(',')}` }
      </span>
    </button>
  );
}
