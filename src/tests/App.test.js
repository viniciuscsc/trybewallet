import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const email = 'email-input';
const password = 'password-input';

describe('Testes da página Login:', () => {
  it('Verifica se os campos de input (email e senha) e botão são renderizados', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const submitBtn = screen.getByRole('button', { name: /entrar/i });

    expect(emailInput
      && passwordInput
      && submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  it('Verifica se o botão é habilitado quando email e senha forem válidos', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const submitBtn = screen.getByRole('button', { name: /entrar/i });

    const validEmail = 'vinicius@email.com';
    const validPassword = '123456';

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    expect(submitBtn).toBeEnabled();
  });

  it('Verifica se a rota da página Login é "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se ao clicar no botão o usuário é direcionado para a página Wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const submitBtn = screen.getByRole('button', { name: /entrar/i });

    const validEmail = 'vinicius@email.com';
    const validPassword = '123456';

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    userEvent.click(submitBtn);

    expect(history.location.pathname).toBe('/carteira');
  });
});

describe('Testes da página Wallet:', () => {
  it('Verifica se o email do usuário é renderizado no Header', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: { user: { email: 'teste@email.com' } },
    });

    const emailField = screen.getByTestId('email-field');
    expect(emailField.innerHTML).toBe('teste@email.com');
  });

  it('Verifica se o total de despesas é renderizado no Header', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    const totalField = screen.getByTestId('total-field');
    expect(parseFloat(totalField.innerHTML)).toBe(0);
  });

  it('Verifica se os campos de input e o botão são renderizados', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(valueInput
      && descriptionInput
      && currencyInput
      && methodInput
      && tagInput
      && addExpenseBtn).toBeInTheDocument();
  });
});
