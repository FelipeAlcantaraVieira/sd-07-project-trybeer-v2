import React, { useEffect } from 'react';
import axios from 'axios';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { fireEvent, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import '@testing-library/dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from '../App';
import { login } from '../service/trybeerApi';

const history = createBrowserHistory();

beforeEach( async () => {
  const { token } = await login('user@test.com', 'test123');
  await axios.get('http://localhost:3001/products',
  { headers: {
    'Content-Type': 'application/json',
    authorization: token,
  } });
  history.push('products');
});
  
describe('5 - Criar tela de produtos', () => {

  it('Será validado que existe um produto na tela de produtos', () => {
    render(<App />);
    window.location.reload();

    expect(screen.getByTestId('0-product-price')).toBeInTheDocument();
    expect(screen.getByTestId('0-product-price')).toBe('R$ 2,20');
    expect(screen.getByTestId('0-product-img')).toBeInTheDocument();
    expect(screen.getByTestId('0-product-name')).toBeInTheDocument();
    expect(screen.getByTestId('0-product-name')).toBe('Skol Lata 250ml');
    expect(screen.getByTestId('0-product-minus')).toBeInTheDocument();
    expect(screen.getByTestId('0-product-qtd')).toBeInTheDocument();
    expect(screen.getByTestId('0-product-qtd')).toBe('0');
    expect(screen.getByTestId('0-product-plus')).toBeInTheDocument();
  });

  it('Será validado que existe todos os produtos na tela de produtos', () => {
    let nomeProdutos= ['Skol Lata 250ml', 'Heineken 600ml', 'Antarctica Pilsen 300ml', 'Brahma 600ml',
                       'Skol 269ml', 'Skol Beats Senses 313ml', 'Becks 330ml', 'Brahma Duplo Malte 350ml',
                       'Becks 600ml', 'Skol Beats Senses 269ml', 'Stella Artois 275ml'];
    let valorProdutos= ['R$ 2,20', 'R$ 7,50', 'R$ 2,49', '7,50', '2,19', 'R$ 4,49',
                        '4,99', 'R$ 2,79', '8,89', '3,57', '3,49'];

    for(var i = 0; i < 11; i++){
      expect(screen.getByTestId(`${i}-product-price`)).toBe(valorProdutos[i]);
      expect(screen.getByTestId(`${i}-product-img`)).toBeInTheDocument();
      expect(screen.getByTestId(`${i}-product-name`)).toBe(nomeProdutos[i]);
      expect(screen.getByTestId(`${i}-product-minus`)).toBeInTheDocument();
      expect(screen.getByTestId(`${i}-product-qtd`)).toBe('0');
      expect(screen.getByTestId(`${i}-product-plus`)).toBeInTheDocument();
    }     
  });

  it('Será validado que é possíve clicar no botão "+" e atualizar o produto para 1', () => {
    fireEvent(screen.getByTestId('0-product-plus'));
    expect(screen.getByTestId('0-product-qtd')).toBe('1');
  });

  it('Será validado que é possível clicar no botão "-" e atualizar o produto para 0', () => {
    fireEvent(screen.getByTestId('0-product-plus'));
    expect(screen.getByTestId('0-product-qtd')).toBe('1');
    fireEvent(screen.getByTestId('0-product-plus'));
    expect(screen.getByTestId('0-product-qtd')).toBe('0');
  });

  it('Será validado que não é possível clicar no botão "-" e atualizar o produto para menor que zero', () => {
    fireEvent(screen.getByTestId('0-product-plus'));
    fireEvent(screen.getByTestId('0-product-minus'));
    fireEvent(screen.getByTestId('0-product-minus'));
    expect(screen.getByTestId('0-product-qtd')).toBe('0');
  });

  it('Será validado que é possível visualizar o botão "Ver Carrinho"', () => {
    expect(screen.getByTestId('checkout-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('checkout-bottom-btn')).toBe('Ver Carrinho');
    expect(screen.getByTestId('checkout-bottom-btn-value')).toBe('R$ 0,00');
  });

  it('Será validado que é possível atualizar o valor do carrinho ao adicionar um produto', () => {
    fireEvent(screen.getByTestId('0-product-plus'));
    expect(screen.getByTestId('0-product-qtd')).toBe('1');
    expect(screen.getByTestId('checkout-bottom-btn')).toBe('Ver Carrinho');
    expect(screen.getByTestId('checkout-bottom-btn-value')).toBe('R$ 2,20');
  });

  it('Será validado que é possível atualizar o valor do carrinho ao remover um produto', () => {
    fireEvent(screen.getByTestId('0-product-plus'));
    expect(screen.getByTestId('0-product-qtd')).toBe('1');
    fireEvent(screen.getByTestId('0-product-minus'));
    expect(screen.getByTestId('0-product-qtd')).toBe('0');
    expect(screen.getByTestId('checkout-bottom-btn')).toBe('Ver Carrinho');
    expect(screen.getByTestId('checkout-bottom-btn-value')).toBe('R$ 0,00');
  });

  it('Será validado que ao atualizar a tela continuará na tela de produtos e carrinho com o mesmo valor', () => {
    fireEvent(screen.getByTestId('0-product-plus'));
    expect(screen.getByTestId('top-title')).toBe('TryBeer');
    expect(screen.getByTestId('0-product-price')).toBe('R$ 2,20');
    expect(screen.getByTestId('0-product-name')).toBe('Skol Lata 250ml');
    expect(screen.getByTestId('checkout-bottom-btn-value')).toBe('R$ 2,20');
  });

  it('Será validado que é possível adicionar um produto e clicar no botão "Ver Carrinho" e ser redirecionado para tela de carrinho', () => {    
    fireEvent(screen.getByTestId('0-product-plus'));
    expect(screen.getByTestId('0-product-qtd')).toBe('1');
    fireEvent(screen.getByTestId('checkout-bottom-btn'));
    history.push('/checkout');
    expect(history.location.pathname).toBe('/checkout');
  });

  it('Será validado que o botão "Ver Carrinho" fique desabilitado caso não adicione nenhum produto', () => {
    expect(screen.getByTestId('checkout-bottom-btn-value')).toDisable();
  });

  it('Será validado que não é possível acessar a tela de produtos sem estar logado e será redirecionado para tela de login', () => {
    localStorage.clear();
    history.push('/login');
    expect(history.location.pathname).toBe('/login');
  });
});
