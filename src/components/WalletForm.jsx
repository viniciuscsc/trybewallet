import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, saveExpense, saveTotal } from '../redux/actions';

const firtsTag = 'Alimentação';
const firstMethod = 'Cartão de crédito';

class WalletForm extends Component {
  state = {
    tags: [firtsTag, 'Lazer', 'Saúde', 'Trabalho', 'Transporte'],
    methods: [firstMethod, 'Cartão de débito', 'Dinheiro'],
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: firstMethod,
    tag: firtsTag,
    exchangeRates: {},
    expense: {},
    total: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleClick = async () => {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    fetch(URL)
      .then((response) => response.json())
      .then((rates) => this.setState({ exchangeRates: rates }, () => {
        const {
          id,
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates,
        } = this.state;

        const valueBRL = value * exchangeRates[currency].ask;
        this.setState((prev) => ({ total: prev.total + valueBRL }), () => {
          const { dispatch } = this.props;
          const { total } = this.state;

          dispatch(saveTotal(total));
        });

        this.setState({
          expense: {
            id,
            value,
            description,
            currency,
            method,
            tag,
            exchangeRates,
          },
        }, () => {
          const { dispatch } = this.props;
          const { expense } = this.state;

          dispatch(saveExpense(expense));
          this.setState((prev) => ({
            id: prev.id + 1,
            value: '',
            description: '',
            currency: 'USD',
            method: firstMethod,
            tag: firtsTag,
          }));
        });
      }));
  };

  render() {
    const { currencies } = this.props;
    const {
      tags,
      methods,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            id="value"
            onChange={ this.handleChange }
            value={ value }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            onChange={ this.handleChange }
            value={ description }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            onChange={ this.handleChange }
            value={ currency }
            data-testid="currency-input"
          >
            {
              currencies.map((curr) => (
                <option key={ curr } value={ curr }>{curr}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            id="method"
            onChange={ this.handleChange }
            value={ method }
            data-testid="method-input"
          >
            {
              methods.map((meth) => (
                <option key={ meth } value={ meth }>{meth}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            id="tag"
            onChange={ this.handleChange }
            value={ tag }
            data-testid="tag-input"
          >
            {
              tags.map((tg) => (
                <option key={ tg } value={ tg }>{tg}</option>
              ))
            }
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
