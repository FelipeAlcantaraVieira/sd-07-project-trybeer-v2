import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { screen, fireEvent, waitForElement, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './config/renderWithRouter';
// import validationClientProfile from '../components/ClientProfile/validationClientProfile';

test('Renderiza tela de perfil do cliente na rota `/profile`', async (done) => {
  const { getByTestId, getByText } = renderWithRouter(<App />);

  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');

  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "test123");
  fireEvent.click(screen.getByTestId('signin-btn'));

  const title = await waitForElement(() => screen.getByText('TryBeer'));
  expect(title).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('top-hamburguer'));
  expect(await waitForElement(() => getByText('Meu Perfil'))).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('side-menu-item-my-profile'));

  expect(screen.getByTestId('top-title')).toBeInTheDocument();
  done();
});

test('Botão de `Salvar` deve estar desabilitado', async (done) => {
  const { getByTestId, getByText } = renderWithRouter(<App />);

  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');

  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "test123");
  fireEvent.click(screen.getByTestId('signin-btn'));

  const title = await waitForElement(() => screen.getByText('TryBeer'));
  expect(title).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('top-hamburguer'));
  expect(await waitForElement(() => getByText('Meu Perfil'))).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('side-menu-item-my-profile'));

  expect(screen.getByText('Salvar')).toBeInTheDocument();
  expect(screen.getByTestId('profile-save-btn')).toBeDisabled();
  done();
});

test('Botão de `Salvar` deve ficar habilitado quando o campo'
  +'`Nome` estiver preenchidos corretamente',
  async (done) => {
  const { getByTestId, getByText } = renderWithRouter(<App />);

  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');

  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "test123");
  fireEvent.click(screen.getByTestId('signin-btn'));

  const title = await waitForElement(() => screen.getByText('TryBeer'));
  expect(title).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('top-hamburguer'));
  expect(await waitForElement(() => getByText('Meu Perfil'))).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('side-menu-item-my-profile'));
  expect(screen.getByTestId('top-title')).toBeInTheDocument();

  const profileNameInput = getByTestId('profile-name-input');
  const profileEmailInput = getByTestId('profile-email-input');

  expect(profileEmailInput).toHaveAttribute('readonly');

  userEvent.type(profileNameInput,"User Name!");
  expect(screen.getByTestId('profile-save-btn')).toBeDisabled();
  
  userEvent.type(profileNameInput,"User Test Name!");
  expect(screen.getByTestId('profile-save-btn')).toBeDisabled();

  userEvent.type(profileNameInput, "User Test Name");
  expect(screen.getByTestId('profile-save-btn')).not.toBeDisabled();
  done();
});

// test('Não deve ser possivel passar um usuario com nome invalido', () => {
//   const invalid = validationClientProfile('!oe');
//   expect(invalid).toBe(true);
// })

// test('Não deve ser possivel passar um usuario com nome menor de 12 caracteres', () => {
//   const invalid = validationClientProfile('!oe');
//   expect(invalid).toBe(true);
// })

// test('É possivel passar um usuario com nome maior que 12 caracteres', () => {
//   const invalid = validationClientProfile('User Test New Name');
//   expect(invalid).toBe(false);
// })
