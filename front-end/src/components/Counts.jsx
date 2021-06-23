import React, { useState, useContext /* , useEffect */ } from 'react';
import TrybeerContext from '../context/TrybeerContext';

export default function Counts(props) {
  const [propsState] = useState(props);
  const { product, index } = propsState;
  const { dispatchShoppingCart, getQuantityByProductId } = useContext(TrybeerContext);

  /* useEffect(() => {
    setPropsState(props);
  }, [props]); */

  const incCount = () => {
    dispatchShoppingCart({
      type:
        getQuantityByProductId(product.id) === 0
          ? 'addProduct'
          : 'incrementProduct',
      payload: product,
    });
  };

  const decCouunt = () => {
    if (!getQuantityByProductId(product.id)) return;
    dispatchShoppingCart({
      type:
        getQuantityByProductId(product.id) === 1
          ? 'delProduct'
          : 'decrementProduct',
      payload: product,
    });
  };

  return (
    <div className="quantity-box">
      <button
        type="button"
        className="quantity-btn"
        data-testid={ `${index}-product-plus` }
        onClick={ () => incCount() }
      >
        <h3>+</h3>
      </button>
      <h4 className="quantity-text" data-testid={ `${index}-product-qtd` }>
        {getQuantityByProductId(product.id)}
      </h4>
      <button
        className="quantity-btn"
        type="button"
        data-testid={ `${index}-product-minus` }
        onClick={ () => decCouunt() }
      >
        <h3>-</h3>
      </button>
    </div>
  );
}
