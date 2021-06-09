import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import '@testing-library/dom';
import { createMemoryHistory } from 'history';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/login';
import { login } from '../service/trybeerApi';

const history = createMemoryHistory();
history.push('login');

const emailId = 'email-input';
const passwordId = 'password-input';

describe('1 - [PÁGINA DE LOGIN] Crie uma página inicial de login com os seguintes campos e características:', () => {

  test('A rota para esta página deve ser \'/login\'', () => {
    renderWithRouter(<Login />);
 
    expect(history.location.pathname).toBe('/login');
  });

  test('Crie um local para que o usuário insira seu email e password', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const email = getByTestId(emailId);
    const password = getByTestId(passwordId);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test('Crie um botão com o texto \'Entrar\'', () => {
    const { getByText } = renderWithRouter(<Login />);

    const button = getByText(/Entrar/i);
    expect(button).toBeInTheDocument();
  });

  test('Realize as seguintes verificações nos campos de email, password e botão:', () => {
    const { getByText, getByTestId } = renderWithRouter(<Login />);
   
    const button = getByText(/Entrar/i);
    expect(button).toBeDisabled();

    const email = getByTestId(emailId);
    const password = getByTestId(passwordId);

    userEvent.type(email, 'email');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'email@com@');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'emailcom@');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, '23456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, '123456');
    expect(button).toBeEnabled();
  });

  test('Realiza login com usuário client, assim que o usuário logar.', () => {
    const { getByText, getByTestId } = renderWithRouter(<Login />);
    
    const email = getByTestId(emailId);
    const password = getByTestId(passwordId);
    const button = getByText(/Entrar/i);

    userEvent.type(email, 'user@test.com');
    userEvent.type(password, 'test123');
    expect(button).toBeEnabled();
    fireEvent.click(button);

    history.push('products');

    expect(history.location.pathname).toBe('/products');
  });

  test('Realiza login com usuário admin, assim que o usuário logar.', () => {
    const { getByText, getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId(emailId);
    const password = getByTestId(passwordId);
    const button = getByText(/Entrar/i);

    userEvent.type(email, 'tryber@trybe.com.br');
    userEvent.type(password, '123456');
    expect(button).toBeEnabled();
    fireEvent.click(button);

    history.push('admin/orders');

    expect(history.location.pathname).toBe('/admin/orders');
  });

  test('Login não autorizado e exibe a menssagem de erro.', async () => {
    const { getByText, getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId(emailId);
    const password = getByTestId(passwordId);
    const button = getByText(/Entrar/i);

    userEvent.type(email, 'test@test.com');
    userEvent.type(password, '123456789');
    expect(button).toBeEnabled();
    fireEvent.click(button);

    const result = await login('test@test.com', '123456789')

    const message = 'Usuário ou senha inválido!';
  
    expect(message).toMatch(result.error);
  });

});



describe('2 - [PÁGINA DE LOGIN INFORMAÇÕES USER LOCALSTORAGE] Salvar as informações de usuário no localstorage e recuperar as informações :', () => {

  test('Testa se o token está ok.', async () => {
    const { getByText, getByTestId } = renderWithRouter(<Login />);
    beforeEach(() => localStorage.clear());
  
    const email = getByTestId(emailId);
    const password = getByTestId(passwordId);
    const button = getByText(/Entrar/i);

    userEvent.type(email, 'user@test.com');
    userEvent.type(password, 'test123');
    expect(button).toBeEnabled();
    fireEvent.click(button);

    const result = await login('user@test.com', 'test123')

    localStorage.setItem('user', JSON.stringify(result));
  
    expect(JSON.parse(localStorage.getItem('user')).token).toBe(result.token);
  });

  test('Testa se o email de usuário está ok.', async () => {
    renderWithRouter(<Login />);
    beforeEach(() => localStorage.clear());

    const result = await login('tryber@trybe.com.br', '123456')

    localStorage.setItem('user', JSON.stringify(result));
  
    expect(JSON.parse(localStorage.getItem('user')).name).toBe(result.name);
    expect(JSON.parse(localStorage.getItem('user')).email).toBe(result.email);
    expect(JSON.parse(localStorage.getItem('user')).role).toBe(result.role);
  });

});