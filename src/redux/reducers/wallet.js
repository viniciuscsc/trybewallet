import {
  REMOVE_EXPENSE,
  SAVE_CURRENCIES,
  SAVE_EXPENSE,
  SAVE_TOTAL,
  START_EDIT,
  SAVE_EDIT,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.payload.filter((expense) => expense.id !== action.payload2),
    };

  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.payload.filter((moeda) => moeda !== 'USDT'),
    };

  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case SAVE_TOTAL:
    return {
      ...state,
      total: parseFloat(action.payload.toFixed(2)),
    };

  case START_EDIT:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };

  case SAVE_EDIT:
    return {
      ...state,
      expenses: state.expenses
        .map((expense) => (expense.id === state.idToEdit ? action.payload : expense)),
      editor: false,
    };

  default:
    return state;
  }
};

export default wallet;
