import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import '@testing-library/dom';
import { createMemoryHistory } from 'history';
import renderWithRouter from './renderWithRouter';
import Register from '../pages/register';
import { login, register } from '../service/trybeerApi';

const history = createMemoryHistory();
history.push('/register');

const nameId = 'signup-name'
const emailId = 'signup-email';
const passwordId = 'signup-password';
const sellerId = 'signup-seller';

describe('1 - [PÁGINA DE REGISTRO] Crie uma página para registro de usuários com os seguintes campos e características:', () => {

  test('A rota para esta página deve ser \'/register\'', () => {
    renderWithRouter(<Register />);
 
    expect(history.location.pathname).toBe('/register');
  });

  test('Crie um local para que o usuário insira seu nome, email e password', () => {
    const { getByTestId } = renderWithRouter(<Register />);

    const name = getByTestId(nameId);
    const email = getByTestId(emailId);
    const password = getByTestId(passwordId);
    const seller = getByTestId(sellerId);

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(seller).toBeInTheDocument();
  });

  test('Crie um botão com o texto \'Cadastrar\'', () => {
    const { getByText } = renderWithRouter(<Register />);

    const button = getByText(/Cadastrar/i);
    expect(button).toBeInTheDocument();
  });

  test('Realize as seguintes verificações nos campos de email, password e botão:', () => {
    const { getByText, getByTestId } = renderWithRouter(<Register />);
   
    const button = getByText(/Cadastrar/i);
    expect(button).toBeDisabled();

    const name = getByTestId(nameId);
    const email = getByTestId(emailId);
    const password = getByTestId(passwordId);

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'email');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'email@com@');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'emailcom@');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, '23456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'alguem@email.');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto Carlos!');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto Carlos1');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, '123456');
    expect(button).toBeEnabled();
  });

  test('Realiza cadastro com usuário client.', () => {
    const { getByText, getByTestId } = renderWithRouter(<Register />);
    
    const name = getByTestId(nameId);
    const email = getByTestId(emailId);
    const password = getByTestId(passwordId);
    const button = getByText(/Cadastrar/i);

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'emailteste@teste.com');
    userEvent.type(password, 'test123');
    expect(button).toBeEnabled();
    fireEvent.click(button);

    history.push('products');

    expect(history.location.pathname).toBe('/products');
  });

  test('Realiza cadastro com usuário admin', () => {
    const { getByText, getByTestId } = renderWithRouter(<Register />);

    const name = getByTestId(nameId);
    const email = getByTestId(emailId);
    const password = getByTestId(passwordId);
    const button = getByText(/Cadastrar/i);
    const seller = getByTestId(sellerId);

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'adminteste@teste.com');
    userEvent.type(password, 'test123');
    fireEvent.click(seller);
    expect(seller).toBeChecked();
    expect(button).toBeEnabled();
    fireEvent.click(button);

    history.push('admin/orders');

    expect(history.location.pathname).toBe('/admin/orders');
  });

  test('Registro de usuário já existente exibe mensagem de erro.', async () => {
    const { getByText, getByTestId } = renderWithRouter(<Register />);

    const name = getByTestId(nameId);
    const email = getByTestId(emailId);
    const password = getByTestId(passwordId);
    const button = getByText(/Cadastrar/i);

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'user@test.com');
    userEvent.type(password, '123456789');
    expect(button).toBeEnabled();
    fireEvent.click(button);

    const result = await register('testuser', 'user@test.com', '123456789', 'client');
    await login('test@test.com', '123456789')

    const message = 'Já existe um usuário com esse e-mail.';
  
    expect(message).toMatch(result.error);
  });

});

