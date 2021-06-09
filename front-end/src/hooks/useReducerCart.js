import { useReducer, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useReducerCart() {
  const CART_KEY_LOCALSTORAGE = 'cart';
  const [cartState, setCartState] = useLocalStorage(CART_KEY_LOCALSTORAGE, []);
  const shoppingCartReducer = (state, { type, payload }) => {
    switch (type) {
    case 'addProduct': {
      const newState = [...state];
      payload.quantity = 1;
      newState.push(payload);
      setCartState(newState);
      return newState;
    }
    case 'delProduct': {
      const newState = [...state].filter(({ id }) => id !== payload.id);
      setCartState(newState);
      return newState;
    }
    case 'incrementProduct': {
      const indexProduct = state.findIndex(({ id }) => id === payload.id);
      const newState = [...state];
      newState[indexProduct].quantity += 1;
      setCartState(newState);
      return newState;
    }
    case 'decrementProduct': {
      const indexProduct = state.findIndex(({ id }) => id === payload.id);
      const newState = [...state];
      newState[indexProduct].quantity -= 1;
      setCartState(newState);
      return newState;
    }
    case 'reset': {
      setCartState([]);
      return [];
    }
    default:
      throw new Error('Unexpected action');
    }
  };

  const memoizedReducer = useCallback(shoppingCartReducer, []);
  return useReducer(memoizedReducer, cartState);
}
