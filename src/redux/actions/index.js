export const SALVA_EMAIL = 'SALVA_EMAIL';
export const SALVA_MOEDAS = 'REQUISITA_DADOS_API';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const SAVE_TOTAL = 'SAVE_TOTAL';

export const salvaEmail = (email) => ({
  type: SALVA_EMAIL,
  payload: email,
});

const salvaMoedas = (moedas) => ({
  type: SALVA_MOEDAS,
  payload: moedas,
});

export const fetchMoedas = () => (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  fetch(URL)
    .then((resposta) => resposta.json())
    .then((moedas) => dispatch(salvaMoedas(Object.keys(moedas))));
};

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  payload: expense,
});

export const saveTotal = (total) => ({
  type: SAVE_TOTAL,
  payload: total,
});
