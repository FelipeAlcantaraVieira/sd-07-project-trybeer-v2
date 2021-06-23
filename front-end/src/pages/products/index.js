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
    <div className="products-container">
      <div>
        <TopMenu topTitle="Produtos" />
      </div>
      <div className="grid">
        {isLoading ? (
          <h3>Carregando</h3>
        ) : (
          products.map((prod, index) => (
            <div key={ prod.id } className="product-card">
              <Images index={ index } value={ prod.urlImage } />
              <Texts index={ index } value={ prod.name } />
              <Prices index={ index } value={ prod.price } />
              <Counts index={ index } product={ prod } />
            </div>
          ))
        )}
      </div>
      <ShowCartButton totalPrice={ totalPriceCart } />
    </div>
  );
}
