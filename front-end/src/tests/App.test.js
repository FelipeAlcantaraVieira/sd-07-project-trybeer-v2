import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './config/renderWithRouter';

test('Renderiza tela de login na rota `/`', () => {
  renderWithRouter(<App />);

  expect(screen.getByText('Login')).toBeInTheDocument();
});
