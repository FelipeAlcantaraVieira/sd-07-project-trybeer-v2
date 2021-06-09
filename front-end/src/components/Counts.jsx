import React, { useState, useContext/* , useEffect */ } from 'react';
import TrybeerContext from '../context/TrybeerContext';

export default function Counts(props) {
  const [propsState/* , setPropsState */] = useState(props);
  const { product, index } = propsState;
  const { dispatchShoppingCart, getQuantityByProductId } = useContext(TrybeerContext);

  /* useEffect(() => {
    setPropsState(props);
  }, [props]); */

  const incCount = () => {
    dispatchShoppingCart({
      type: getQuantityByProductId(product.id) === 0 ? 'addProduct' : 'incrementProduct',
      payload: product,
    });
  };

  const decCouunt = () => {
    if (!getQuantityByProductId(product.id)) return;
    dispatchShoppingCart({
      type: getQuantityByProductId(product.id) === 1 ? 'delProduct' : 'decrementProduct',
      payload: product,
    });
  };

  return (
    <div>
      <button
        type="button"
        data-testid={ `${index}-product-minus` }
        onClick={ () => decCouunt() }
      >
        -
      </button>
      {' '}
      <span
        data-testid={ `${index}-product-qtd` }
      >
        { getQuantityByProductId(product.id) }
      </span>
      {' '}
      <button
        type="button"
        data-testid={ `${index}-product-plus` }
        onClick={ () => incCount() }
      >
        +
      </button>
    </div>
  );
}
