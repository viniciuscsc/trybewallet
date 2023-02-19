export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'RECEIVE_CURRENCIES';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const fetchCurrencies = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => {
      dispatch(saveCurrencies(Object.keys(currencies)));
    });
};
