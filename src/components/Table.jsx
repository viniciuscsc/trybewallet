import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense, saveTotal, startEdit } from '../redux/actions/index';

class Table extends Component {
  handleClick = ({ target: { id, name } }) => {
    const { dispatch, expenses, total } = this.props;
    const updatedTotal = total - parseFloat(name);

    dispatch(saveTotal(updatedTotal));
    dispatch(removeExpense(expenses, id));
  };

  startEdit = ({ target: { id, name } }) => {
    const { dispatch, total } = this.props;
    const updatedTotal = total - parseFloat(name);

    dispatch(saveTotal(updatedTotal));
    dispatch(startEdit(Number(id)));
  };

  // onClick={ () => dispatch(startEdit(expense.id)) }

  render() {
    const { expenses } = this.props;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>
                    { parseFloat(expense.value).toFixed(2) }
                  </td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>
                    {parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                  </td>
                  <td>
                    {
                      (parseFloat(expense.value)
                      * parseFloat(expense.exchangeRates[expense.currency].ask))
                        .toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      id={ expense.id }
                      name={ (parseFloat(expense.value)
                        * parseFloat(expense.exchangeRates[expense.currency].ask))
                        .toFixed(2) }
                      onClick={ this.startEdit }
                      data-testid="edit-btn"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      id={ expense.id }
                      name={ (parseFloat(expense.value)
                        * parseFloat(expense.exchangeRates[expense.currency].ask))
                        .toFixed(2) }
                      onClick={ this.handleClick }
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
  total: globalState.wallet.total,
  idToEdit: globalState.wallet.idToEdit,
  editor: globalState.wallet.editor,
});

export default connect(mapStateToProps)(Table);
