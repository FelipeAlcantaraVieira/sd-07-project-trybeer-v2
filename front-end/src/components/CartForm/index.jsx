import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TrybeerContext from '../../context/TrybeerContext';
import { saveSale } from '../../service/trybeerApi';

export default function CartForm() {
  const {
    getTotalShoppingCart,
    dispatchShoppingCart,
    userLogged,
    shoppingCart,
  } = useContext(TrybeerContext);
  const [totalPriceCart, setTotalPriceCart] = useState(getTotalShoppingCart());
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
    console.log(street, houseNumber);
    const sale = {
      userId: userLogged.id,
      street,
      houseNumber,
      totalPrice: getTotalShoppingCart(),
    };
    console.log('saleobj', sale);
    console.log(shoppingCart);
    await saveSale(sale, shoppingCart);
    setShowFinishMessage(true);
  };

  return (
    <div className="checkout-form-container">
      <h2 className="checkout-total-price">
        Total:
        <span data-testid="order-total-value">
          {` R$ ${totalPriceCart.toFixed(2).split('.').join(',')}`}
        </span>
      </h2>
      <div className="form-checkout-container">
        <label htmlFor="street">
          Rua:
          <input
            id="street"
            name="street"
            type="text"
            value={ salesInfo.street }
            placeholder="Digite aqui"
            data-testid="checkout-street-input"
            onChange={ handleChange }
          />
        </label>
      </div>
      <div className="form-checkout-container">
        <label htmlFor="house-number">
          Número da casa:
          <input
            id="house-number"
            name="houseNumber"
            type="text"
            value={ salesInfo.houseNumber }
            placeholder="Digite aqui"
            data-testid="checkout-house-number-input"
            onChange={ handleChange }
          />
        </label>
      </div>
      {showFinishMessage && <p className="error">Compra realizada com sucesso!</p>}
      <button
        type="button"
        className="button-final"
        data-testid="checkout-finish-btn"
        disabled={
          !totalPriceCart
          || salesInfo.street === ''
          || salesInfo.houseNumber === ''
        }
        onClick={ handleClick }
      >
        Finalizar Pedido
      </button>
    </div>
  );
}
