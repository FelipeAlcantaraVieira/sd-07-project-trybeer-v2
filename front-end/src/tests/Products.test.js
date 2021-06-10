import React from 'react';
import { screen, fireEvent, waitForElement, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './config/renderWithRouter';

test('Renderiza tela de lista dos produtos na rota `/products`', async (done) => {
  const { getByTestId, getByText } = renderWithRouter(<App />);

  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');

  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "test123");
  fireEvent.click(screen.getByTestId('signin-btn'));

  const title = await waitForElement(() => screen.getByText('TryBeer'));
  expect(title).toBeInTheDocument();

  done();
});

test('Renderiza os cards com os produtos', async (done) => {
  const { getByTestId, getByText } = renderWithRouter(<App />);

  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');

  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "test123");
  fireEvent.click(screen.getByTestId('signin-btn'));

  const title = await waitForElement(() => screen.getByText('TryBeer'));
  expect(title).toBeInTheDocument();

  expect(await waitForElement(() => getByTestId('0-product-name'))).toBeInTheDocument();
  expect(await waitForElement(() => getByTestId('0-product-img'))).toBeInTheDocument();
  expect(await waitForElement(() => getByTestId('0-product-price'))).toBeInTheDocument();
  expect(await waitForElement(() => getByTestId('0-product-qtd'))).toBeInTheDocument();
  expect(await waitForElement(() => getByTestId('0-product-plus'))).toBeInTheDocument();
  expect(await waitForElement(() => getByTestId('0-product-minus'))).toBeInTheDocument();
  
  done();
});

test('Ao clicar botão +, a quantidade do produto deve aumentar em 1',
  async (done) => {
  const { getByTestId } = renderWithRouter(<App />);

  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');

  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "test123");
  fireEvent.click(screen.getByTestId('signin-btn'));

  const title = await waitForElement(() => screen.getByTestId('top-title'));
  expect(title).toBeInTheDocument();

  const card = await waitForElement(() => getByTestId('0-product-plus'));
  expect(card).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('0-product-plus'));
  expect(screen.getByTestId('0-product-qtd')).toHaveTextContent('1');

  done();
});

test('Ao clicar botão -, a quantidade do produto deve diminuir em 1',
  async (done) => {
  const { getByTestId, getByText } = renderWithRouter(<App />);

  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');

  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "test123");
  fireEvent.click(screen.getByTestId('signin-btn'));

  const title = await waitForElement(() => screen.getByText('TryBeer'));
  expect(title).toBeInTheDocument();

  const card = await waitForElement(() => getByTestId('0-product-plus'));
  expect(card).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('0-product-plus'));
  expect(screen.getByTestId('0-product-qtd')).toHaveTextContent('2');

  fireEvent.click(screen.getByTestId('0-product-minus'));
  expect(screen.getByTestId('0-product-qtd')).toHaveTextContent('1');

  done();
});

