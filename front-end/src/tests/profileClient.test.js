import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import '@testing-library/dom';
import { createMemoryHistory } from 'history';
import renderWithRouter from './renderWithRouter';
import ProfileClient from '../pages/profileClient';

const history = createMemoryHistory();
history.push('/profile');

const titleId = 'top-title';
const nameId = 'profile-name-input';
const emailId = 'profile-email-input';

describe('1 - [PÁGINA DE PERFIL DO CLIENTE] Crie uma página de perfil para clientes com os seguintes campos e características:', () => {

  test('A rota para esta página deve ser \'/profile\'', () => {
    renderWithRouter(<ProfileClient />);
 
    expect(history.location.pathname).toBe('/profile');
  });

  test('A página contém um título e campos para nome e email', () => {
    const { getByTestId } = renderWithRouter(<ProfileClient />);

    const title = getByTestId(titleId);
    const name = getByTestId(nameId);
    const email = getByTestId(emailId);

    expect(title).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  test('Contém um título com o texto \'Perfil\'', () => {
    const { getByText } = renderWithRouter(<ProfileClient />);

    const title = getByText(/Perfil/i);
    expect(title).toBeInTheDocument();
  });

  test('Crie um botão com o texto \'Salvar\'', () => {
    const { getByText } = renderWithRouter(<ProfileClient />);

    const button = getByText(/Salvar/i);
    expect(button).toBeInTheDocument();
  });
  

  test('O botão salvar fica desabilitado caso não altere o nome.', () => {
    const { getByText } = renderWithRouter(<ProfileClient />);
    
    const button = getByText(/Salvar/i);
    expect(button).toBeDisabled();
  });

  test('O botão salvar fica habilitado caso o nome seja alterado', () => {
    const { getByText, getByTestId } = renderWithRouter(<ProfileClient />);
    
    const name = getByTestId(nameId);
    const button = getByText(/Salvar/i);

    userEvent.type(name, `Antonio Gonzales`);
    expect(button).toBeEnabled();
  });

  test('É possível alterar o nome do usuário', () => {
    const { getByText, getByTestId } = renderWithRouter(<ProfileClient />);

    const name = getByTestId(nameId);
    const button = getByText(/Salvar/i);

    userEvent.type(name, 'Antonio Gonzales');
    fireEvent.click(button);

    const newName = getByTestId(nameId);
    expect(newName).toHaveValue('Antonio Gonzales');
  });
});
