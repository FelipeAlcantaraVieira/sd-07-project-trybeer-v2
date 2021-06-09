import React, { useState } from 'react';
import TrybeerContext from './TrybeerContext';
import { useLocalStorage, useReducerCart } from '../hooks';

export default function Provider(props) {
  const [provideProps] = useState(props); // Props of Provide

  // ABOUT SHOPPING CART
  const [shoppingCart, dispatchShoppingCart] = useReducerCart();
  const getTotalShoppingCart = () => shoppingCart
    .reduce((sum, { quantity, price }) => sum + (parseFloat(price) * quantity), 0.0);
  const getQuantityByProductId = (productId) => {
    if (!shoppingCart.length) return 0;
    const product = shoppingCart.find(({ id }) => id === productId);
    if (!product || !product.quantity) return 0;
    return product.quantity;
  };
  // ****************************************************************

  // ABOUT LOGIN | LOGOUT | AND USER
  const USER_KEY_LOCALSTORAGE = 'user';
  const [userLogged, setUserLogged] = useLocalStorage(USER_KEY_LOCALSTORAGE, {});
  const login = ({ role, name, email, token, id }) => {
    setUserLogged({ role, name, email, token, id });
    dispatchShoppingCart({ type: 'reset' });
  };
  const logout = () => setUserLogged({});
  const userIsLogged = () => userLogged && Object.entries(userLogged).length !== 0;
  // ****************************************************************

  // ABOUT USER SALES
  const [saleId, setSaleId] = useState();
  const [saleDate, setSaleDate] = useState();
  const [totalPrice, setTotalPrice] = useState();

  // ****************************************************************

  const context = {
    userLogged,
    login,
    logout,
    userIsLogged,
    setUserLogged,
    shoppingCart,
    dispatchShoppingCart,
    getTotalShoppingCart,
    getQuantityByProductId,
    saleId,
    setSaleId,
    saleDate,
    setSaleDate,
    totalPrice,
    setTotalPrice,
  };

  const { children } = provideProps;

  return (
    <TrybeerContext.Provider
      value={ context }
    >
      {children}
    </TrybeerContext.Provider>
  );
}
