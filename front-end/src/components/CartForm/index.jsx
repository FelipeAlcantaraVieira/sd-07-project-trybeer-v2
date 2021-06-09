import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TrybeerContext from '../../context/TrybeerContext';
import { saveSale } from '../../service/trybeerApi';

export default function CartForm() {
  const {
    getTotalShoppingCart,
    dispatchShoppingCart,
    userLogged,
    shoppingCart } = useContext(TrybeerContext);
  const [
    totalPriceCart,
    setTotalPriceCart] = useState(getTotalShoppingCart());
  const [showFinishMessage, setShowFinishMessage] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const history = useHistory();
  const [salesInfo, setSalesInfo] = useState({
    street: '',
    houseNumber: '',
  });
  const TWO_SECONDS = 2000;

  useEffect(() => {
    setTotalPriceCart(getTotalShoppingCart());
  }, [getTotalShoppingCart, setTotalPriceCart]);

  useEffect(() => {
    if (showFinishMessage) {
      setShouldRedirect(true);
    }
  }, [showFinishMessage]);

  useEffect(() => {
    let interval = null;
    if (shouldRedirect) {
      interval = setInterval(() => {
        dispatchShoppingCart({ type: 'reset' });
        history.push('/products');
      }, TWO_SECONDS);
    }
    return () => (interval ? clearInterval(interval) : null);
  }, [dispatchShoppingCart, history, shouldRedirect]);

  const handleChange = ({ target: { name, value } }) => {
    setSalesInfo({
      ...salesInfo,
      [name]: value,
    });
  };

  const handleClick = async () => {
    const { street, houseNumber } = salesInfo;
    const sale = {
      userId: userLogged.id,
      street,
      houseNumber,
      totalPrice: getTotalShoppingCart(),
    };
    await saveSale(sale, shoppingCart);
    setShowFinishMessage(true);
  };

  return (
    <div>
      <h2> Endereço </h2>
      <div>
        <label htmlFor="street">
          Rua:
          <input
            id="street"
            name="street"
            type="text"
            value={ salesInfo.street }
            data-testid="checkout-street-input"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="house-number">
          Número da casa:
          <input
            id="house-number"
            name="houseNumber"
            type="text"
            value={ salesInfo.houseNumber }
            data-testid="checkout-house-number-input"
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="checkout-finish-btn"
          disabled={ !totalPriceCart
            || salesInfo.street === ''
            || salesInfo.houseNumber === '' }
          onClick={ handleClick }
        >
          Finalizar Pedido
        </button>
        { showFinishMessage && <p>Compra realizada com sucesso!</p>}
      </div>
    </div>
  );
}
