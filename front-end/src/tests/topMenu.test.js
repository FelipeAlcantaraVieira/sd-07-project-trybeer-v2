import React from 'react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { fireEvent, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import '@testing-library/dom';
import { createMemoryHistory } from 'history';
import App from '../App';

const history = createMemoryHistory();

describe('1 - [PÁGINA DE REGISTER] Testa se a rota "/register" existe:', () => {
  
  test('A rota para esta página deve ser \'/register\'', () => {
    history.push('register');
    render(<App />);
 
    expect(history.location.pathname).toBe('/register');
  });

  test('O hamburger botão e o título Trybeer deve existir', () => {
    render(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('no-account-btn');

    userEvent.type(email, 'user@test.com');
    userEvent.type(password, 'test123');
    expect(button).toBeEnabled();
    fireEvent.click(button)
    
    const tituleTrybeer = screen.getByTestId('top-title');
    const hamburgerButton = screen.getByTestId('top-hamburguer');

    expect(tituleTrybeer).toBeInTheDocument();
    expect(hamburgerButton).toBeInTheDocument();
  });

  test('Testa a existencia de do SideBar', () => {
    history.push('register');
    render(<App />);

    const hamburgerButton = screen.getByTestId('top-hamburguer');

    fireEvent.click(hamburgerButton);

    const products = screen.getByTestId('side-menu-item-products');
    const orders = screen.getByTestId('side-menu-item-my-orders');
    const profile = screen.getByTestId('side-menu-item-my-profile');
    const quit = screen.getByTestId('side-menu-item-logout');


    expect(products).toBeInTheDocument();
    expect(orders).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(quit).toBeInTheDocument();
  });

})

describe('2 - [PÁGINA DE REGISTER] Testa se todas as rotas de SideBar redirecionam corretamente', () => {
  
  test('A rota para esta página deve ser \'/register\'', () => {
    render(<App />);

    const hamburgerButton = screen.getByTestId('top-hamburguer');

    fireEvent.click(hamburgerButton);

    const products = screen.getByTestId('side-menu-item-products');
    const orders = screen.getByTestId('side-menu-item-my-orders');
    const profile = screen.getByTestId('side-menu-item-my-profile');
    const quit = screen.getByTestId('side-menu-item-logout');
  });

  test('Botao produtos encaminha para a rota "/products"', () => {
    history.push('products');
    render(<App />);

    const hamburgerButton = screen.getByTestId('top-hamburguer');

    fireEvent.click(hamburgerButton);

    const products = screen.getByTestId('side-menu-item-products');

    fireEvent.click(products);
    expect(history.location.pathname).toBe('/products');
  });

  test('Botao "Meus pedidos" encaminha para a rota "/orders"', () => {
    history.push('orders');
    render(<App />);

    const hamburgerButton = screen.getByTestId('top-hamburguer');

    fireEvent.click(hamburgerButton);

    const orders = screen.getByTestId('side-menu-item-my-orders');

    fireEvent.click(orders);
    expect(history.location.pathname).toBe('/orders');
  });

  test('Botao "Meus pedidos" encaminha para a rota "/profile"', () => {
    history.push('profile');
    render(<App />);

    const hamburgerButton = screen.getByTestId('top-hamburguer');

    fireEvent.click(hamburgerButton);

    const profile = screen.getByTestId('side-menu-item-my-profile');

    fireEvent.click(profile);
    expect(history.location.pathname).toBe('/profile');
  });

  test('Botao "Meus pedidos" encaminha para a rota "/orders"', () => {
    history.push('login');
    render(<App />);

    const hamburgerButton = screen.getByTestId('top-hamburguer');

    fireEvent.click(hamburgerButton);

    const quit = screen.getByTestId('side-menu-item-logout');

    fireEvent.click(quit);
    expect(history.location.pathname).toBe('/login');
  });
})
