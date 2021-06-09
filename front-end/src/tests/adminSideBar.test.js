import React from 'react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { fireEvent, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import '@testing-library/dom';
import { createMemoryHistory } from 'history';
import AdminSideBar from '../components/AdminSideBar';

const history = createMemoryHistory();

describe('1 - [PÁGINA DE REGISTER] Testa se a rota "/register" existe:', () => {
  
  test('A rota para esta página deve ser \'/register\'', () => {
    render(<AdminSideBar />);
    const pedidos = screen.getByTestId('side-menu-item-orders');

    expect(pedidos).toBeInTheDocument();
  });

  test('A rota para esta página deve ser \'/register\'', () => {
    render(<AdminSideBar />);
    const perfil = screen.getByTestId('side-menu-item-profile');

    expect(perfil).toBeInTheDocument();
  });

  test('A rota para esta página deve ser \'/register\'', () => {
    render(<AdminSideBar />);
    const quit = screen.getByTestId('side-menu-item-logout');

    expect(quit).toBeInTheDocument();
  });
})
