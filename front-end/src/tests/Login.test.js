import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './config/renderWithRouter';

test('Renderiza tela de login na rota `/login`', () => {
  renderWithRouter(<Login />);

  expect(screen.getByText('Login')).toBeInTheDocument();
});

test('Botão de `Entrar` deve estar desabilitado', () => {
  renderWithRouter(<Login />);

  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.getByTestId('signin-btn')).toBeDisabled();
});

test('Botão de `Entrar` deve ficar habilitado quando os campos'
  +'estiverem preenchidos corretamente',
  () => {
  const { getByTestId } = renderWithRouter(<Login />);

  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');

  expect(screen.getByText('Login')).toBeInTheDocument();

  userEvent.type(emailInput, /user@test/);
  userEvent.type(passwordInput, "123456");
  expect(screen.getByTestId('signin-btn')).toBeDisabled();

  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "123456");
  expect(screen.getByTestId('signin-btn')).not.toBeDisabled();
});

test('Quando clicar botão `Ainda não tenho conta`, redirecionar para rota `/register`', () => {
  const { history } = renderWithRouter(<Login />);
  fireEvent.click(screen.getByTestId('no-account-btn'));

  const { pathname } = history.location;
  expect(pathname).toBe('/register');
});
