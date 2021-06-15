import React from 'react';
import { Container } from 'react-bootstrap';
import './login.css';
import Header from '../../components/Header';
import ProductsList from '../../components/ProductsList';
import AuthVerification from '../../components/AuthVerification';

const Products = () => {
  AuthVerification();

  return (
    <div className="products">
      <Header title="TryBeer" />
      <Container style={ { height: '100vh' } }>
        <ProductsList />
      </Container>
    </div>
  );
};
export default Products;
