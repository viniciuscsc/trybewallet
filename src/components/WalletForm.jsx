import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="expense-amount">
          Valor:
          <input
            type="number"
            id="expense-amount"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select id="currency" data-testid="currency-input">
            {
              currencies.map((currency) => (
                <option key={ currency } value={ currency }>{currency}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="payment-method">
          Método de pagamento:
          <select id="payment-method" data-testid="method-input">
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
            <option value="dinheiro">Dinheiro</option>
          </select>
        </label>
        <label htmlFor="expense-category">
          <select id="expense-category" data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="saude">Saúde</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
