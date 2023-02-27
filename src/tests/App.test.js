import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const emailInput = 'email-input';
const passwordInput = 'password-input';

const validEmail = 'teste@teste.com';
const validPassword = '123456';

describe('Testes da página Login:', () => {
  it('O path da página é: "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Os campos para input (Email e Senha) e o botão "Entrar" são renderizados', () => {
    renderWithRouterAndRedux(<App />);

    const emailField = screen.getByTestId(emailInput);
    expect(emailField).toBeInTheDocument();

    const passwordField = screen.getByTestId(passwordInput);
    expect(passwordField).toBeInTheDocument();

    const loginBtn = screen.getByRole('button', { name: /entrar/i });
    expect(loginBtn).toBeInTheDocument();
  });

  it('O botão "Entrar" inicia desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    const loginBtn = screen.getByRole('button', { name: /entrar/i });
    expect(loginBtn).toBeDisabled();
  });

  it('Os dados digitados são armazenados no estado do componente', () => {
    renderWithRouterAndRedux(<App />);

    const emailField = screen.getByTestId(emailInput);
    userEvent.type(emailField, 'email');
    expect(emailField).toHaveValue('email');

    const passwordField = screen.getByTestId(passwordInput);
    userEvent.type(passwordField, 'password');
    expect(passwordField).toHaveValue('password');
  });

  it('Quando email e senha são válidos, o botão "Entrar" é habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const emailField = screen.getByTestId(emailInput);
    userEvent.type(emailField, validEmail);

    const passwordField = screen.getByTestId(passwordInput);
    userEvent.type(passwordField, validPassword);

    const loginBtn = screen.getByRole('button', { name: /entrar/i });
    expect(loginBtn).toBeEnabled();
  });

  it('Ao clicar no botão "Entrar" o email é armazenado no estado da aplicação', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const emailField = screen.getByTestId(emailInput);
    userEvent.type(emailField, validEmail);

    const passwordField = screen.getByTestId(passwordInput);
    userEvent.type(passwordField, validPassword);

    const loginBtn = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(loginBtn);

    expect(store.getState().user.email).toBe(validEmail);
  });

  it('Ao clicar no botão "Entrar" o usuário é direcionado para a rota: "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailField = screen.getByTestId(emailInput);
    userEvent.type(emailField, validEmail);

    const passwordField = screen.getByTestId(passwordInput);
    userEvent.type(passwordField, validPassword);

    const loginBtn = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(loginBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

describe('Testes da página Wallet', () => {
  afterEach(() => jest.clearAllMocks());
  const initialEntries = ['/carteira'];

  it('O path da página é: "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries,
    });
    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
  });

  it('O email do usuário é renderizado no Header', () => {
    const initialState = {
      user: {
        email: validEmail,
      },
    };

    renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState,
    });

    const userEmail = screen.getByTestId('email-field');
    expect(userEmail).toBeInTheDocument();
    expect(userEmail.innerHTML).toBe(validEmail);
  });

  it('O valor total de despesas é renderizado no Header', () => {
    const initialState = {
      wallet: {
        currencies: [],
        expenses: [],
        total: 0,
        editor: false,
        idToEdit: 0,
      },
    };

    renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState,
    });

    const amount = screen.getByTestId('total-field');
    expect(amount).toBeInTheDocument();
    expect(amount.innerHTML).toBe('0');
  });

  it('A sigla "BRL" é renderizada no Header', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries,
    });

    const acronym = screen.getByTestId('header-currency-field');
    expect(acronym).toBeInTheDocument();
    expect(acronym.innerHTML).toBe('BRL');
  });

  it('Os campos para input (Valor e Descrição) são renderizados e iniciam em branco', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries,
    });

    const valueField = screen.getByTestId('value-input');
    expect(valueField).toBeInTheDocument();
    expect(valueField.value).toBe('');

    const descriptionField = screen.getByTestId('description-input');
    expect(descriptionField).toBeInTheDocument();
    expect(descriptionField.value).toBe('');
  });

  it('Os campos para select são renderizados e iniciam com a primeira option', async () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries,
    });

    const currencyField = screen.getByTestId('currency-input');
    expect(currencyField).toBeInTheDocument();

    const usdOption = await screen.findByRole('option', { name: /usd/i });
    expect(usdOption.selected).toBeTruthy();

    const paymentMethodField = screen.getByTestId('method-input');
    expect(paymentMethodField).toBeInTheDocument();

    const creditCardOption = screen.getByRole('option', { name: /cartão de crédito/i });
    expect(creditCardOption.selected).toBeTruthy();

    const categoryField = screen.getByTestId('tag-input');
    expect(categoryField).toBeInTheDocument();

    const alimentationOption = screen.getByRole('option', { name: /alimentação/i });
    expect(alimentationOption.selected).toBeTruthy();
  });

  it('O botão "Adicionar despesa" é renderizado e está habilitado', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries,
    });

    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addExpenseBtn).toBeInTheDocument();
    expect(addExpenseBtn).toBeEnabled();
  });

  it('A tabela de despesas é renderizada apenas com os títulos das colunas', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries,
    });

    const descriptionTitle = screen.getByTestId('description-th');
    expect(descriptionTitle).toBeInTheDocument();

    const categoryTitle = screen.getByTestId('tag-th');
    expect(categoryTitle).toBeInTheDocument();

    const methodTitle = screen.getByTestId('method-th');
    expect(methodTitle).toBeInTheDocument();

    const valueTitle = screen.getByTestId('value-th');
    expect(valueTitle).toBeInTheDocument();

    const currencyTitle = screen.getByTestId('currency-th');
    expect(currencyTitle).toBeInTheDocument();

    const eRateTitle = screen.getByTestId('exchange-rate-th');
    expect(eRateTitle).toBeInTheDocument();

    const cValueTitle = screen.getByTestId('converted-value-th');
    expect(cValueTitle).toBeInTheDocument();

    const convCurrencyTitle = screen.getByTestId('conversion-currency-th');
    expect(convCurrencyTitle).toBeInTheDocument();

    const editDeleteTitle = screen.getByTestId('edit-delete-th');
    expect(editDeleteTitle).toBeInTheDocument();
  });

  it('Ao adicionar uma despesa, uma nova linha é renderizada na tabela', async () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries,
    });

    const valueField = screen.getByTestId('value-input');
    userEvent.type(valueField, '20');

    const descriptionField = screen.getByTestId('description-input');
    userEvent.type(descriptionField, '20 dolares americanos');

    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addExpenseBtn);

    const editBtn = await screen.findByRole('button', { name: /editar/i });
    expect(editBtn).toBeInTheDocument();
  });
});
