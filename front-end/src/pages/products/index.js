import React, { useContext, useEffect, useState } from 'react';
import {
  Prices,
  Images,
  Texts,
  ShowCartButton,
  TopMenu,
  Counts,
} from '../../components';
import TrybeerContext from '../../context/TrybeerContext';
import { productList } from '../../service/trybeerApi';

import './style.css';

export default function Product() {
  const { getTotalShoppingCart, shoppingCart } = useContext(TrybeerContext);
  const [totalPriceCart, setTotalPriceCart] = useState(getTotalShoppingCart());
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const listProducts = async () => {
    const productData = await productList();
    if (productData.error) {
      return setProducts([]);
    }
    setProducts(productData);
  };

  useEffect(() => {
    setIsLoading(true);
    listProducts().then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setTotalPriceCart(getTotalShoppingCart());
  }, [shoppingCart, getTotalShoppingCart]);

  return (
    <div>
      <div>
        <h3>{ isLoading ? 'Carregando' : '' }</h3>
        <TopMenu />
      </div>
      <div className="div-card">
        {products && products.map((prod, index) => (
          <div key={ prod.id }>
            <br />
            ---------------------------------------------------------------------------
            <Prices index={ index } value={ prod.price } />
            <Images index={ index } value={ prod.url_image } />
            <Texts index={ index } value={ prod.name } />
            <Counts index={ index } product={ prod } />
          </div>
        ))}
        <br />
        <div className="div-salesCar">
          <ShowCartButton totalPrice={ totalPriceCart } />
        </div>
      </div>
    </div>
  );
}
