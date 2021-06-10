import React from 'react';
import { screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../pages/Register';
import renderWithRouter from './config/renderWithRouter';

test('Renderiza tela de registro na rota `/register`', () => {
  renderWithRouter(<Register />);

  expect(screen.getByText('Registro')).toBeInTheDocument();
});

test('Botão de `Cadastrar` deve estar desabilitado', () => {
  renderWithRouter(<Register />);

  expect(screen.getByText('Registro')).toBeInTheDocument();
  expect(screen.getByTestId('signup-btn')).toBeDisabled();
});

test('Botão de `Cadastrar` deve ficar habilitado quando os campos'
  +'estiverem preenchidos corretamente',
  () => {
  const { getByTestId } = renderWithRouter(<Register />);

  const nameInput = getByTestId('signup-name');
  const emailInput = getByTestId('signup-email');
  const passwordInput = getByTestId('signup-password');

  expect(screen.getByText('Registro')).toBeInTheDocument();

  userEvent.type(nameInput, "Test User Name");
  userEvent.type(emailInput, /user@test/);
  userEvent.type(passwordInput, "123456");
  expect(screen.getByTestId('signup-btn')).toBeDisabled();

  userEvent.type(nameInput, "Test User Name");
  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "123456");
  expect(screen.getByTestId('signup-btn')).not.toBeDisabled();
});

test('Quando não clicar o checkbox `Quero vender`,'
  +'redirecionar para rota `/products`', () => {
  const { getByTestId, history } = renderWithRouter(<Register />);

  const nameInput = getByTestId('signup-name');
  const emailInput = getByTestId('signup-email');
  const passwordInput = getByTestId('signup-password');

  userEvent.type(nameInput, "Test User Name");
  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "123456");
  expect(screen.getByTestId('signup-seller')).not.toBeChecked();
  fireEvent.submit(screen.getByTestId('signup-btn'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/products');
  }, 3000);
});

test('Quando clicar o checkbox `Quero vender`,'
  +'redirecionar para rota `/admin/orders`', () => {
  const { getByTestId, history } = renderWithRouter(<Register />);

  const nameInput = getByTestId('signup-name');
  const emailInput = getByTestId('signup-email');
  const passwordInput = getByTestId('signup-password');

  userEvent.type(nameInput, "Test User Name");
  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "123456");
  expect(screen.getByTestId('signup-seller')).not.toBeChecked();
  fireEvent.change(screen.getByTestId('signup-seller'), { target: { checked: true } });
  expect(screen.getByTestId('signup-seller')).toBeChecked();
  fireEvent.submit(screen.getByTestId('signup-btn'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/admin/orders');
  }, 3000);
});
