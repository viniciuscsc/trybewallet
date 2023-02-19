import { SAVE_CURRENCIES } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.payload.filter((currency) => currency !== 'USDT'),
    };

  default:
    return state;
  }
};

export default wallet;
