import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import '@testing-library/dom';
import { createMemoryHistory } from 'history';
import renderWithRouter from './renderWithRouter';
import ProfileAdmin from '../pages/profileAdmin';

const history = createMemoryHistory();
history.push('/admin/profile');

const titleId = 'profile-title';
const nameId = 'profile-name';
const emailId = 'profile-email';

describe('1 - [PÁGINA DE PERFIL DO ADMIN] Crie uma página de perfil para admins com os seguintes campos e características:', () => {

  test('A rota para esta página deve ser \'/admin/profile\'', () => {
    renderWithRouter(<ProfileAdmin />);
 
    expect(history.location.pathname).toBe('/admin/profile');
  });

  test('A página contém um título e campos para nome e email', () => {
    const { getByTestId } = renderWithRouter(<ProfileAdmin />);

    const title = getByTestId(titleId);
    const name = getByTestId(nameId);
    const email = getByTestId(emailId);

    expect(title).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  test('Contém um título com o texto \'Perfil\'', () => {
    const { getByTestId } = renderWithRouter(<ProfileAdmin />);

    const title = getByTestId(titleId);
    expect(title).toHaveTextContent('Perfil');
  });
});
