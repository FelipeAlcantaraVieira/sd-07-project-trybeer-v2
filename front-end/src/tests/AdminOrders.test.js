import React from 'react';
import { screen, fireEvent, waitForElement } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './config/renderWithRouter';

test('Ao realizar login o administrador deve ser redirecionado para a rota admin/orders', async (done) => {
  const { getByTestId, history, getByText } = renderWithRouter(<App />);
  fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'tryber@trybe.com.br'}});
  fireEvent.change(screen.getByTestId('password-input'), { target: { value: '123456' }});
  fireEvent.click(screen.getByText(/Entrar/), { button: 0 });
  const orderNumber = await waitForElement(() => getByTestId('0-order-number'));
  expect(orderNumber).toBeInTheDocument();
  const orderAddress = await waitForElement(() => getByTestId('0-order-address'));
  expect(orderAddress).toBeInTheDocument();
  const orderStatus = await waitForElement(() => getByTestId('0-order-status'));
  expect(orderStatus).toBeInTheDocument();
  const orderTotalValue = await waitForElement(() => getByTestId('0-order-total-value'));
  expect(orderTotalValue).toBeInTheDocument();
  done();
});
