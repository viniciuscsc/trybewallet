export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const SAVE_TOTAL = 'SAVE_TOTAL';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const fetchCurrencies = () => (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  fetch(URL)
    .then((response) => response.json())
    .then((currencies) => dispatch(saveCurrencies(Object.keys(currencies))));
};

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  payload: expense,
});

export const saveTotal = (total) => ({
  type: SAVE_TOTAL,
  payload: total,
});
