import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { salvaEmail } from '../redux/actions/index';

class Login extends Component {
  state = {
    email: '',
    senha: '',
  };

  gerenciaInput = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  validaCampos = () => {
    const { email, senha } = this.state;
    const regexEmail = /\S+@\S+\.\S+/;
    const tamanhoMinimo = 6;

    const emailValido = regexEmail.test(email);
    const senhaValida = senha.length >= tamanhoMinimo;

    return emailValido && senhaValida;
  };

  habilitaBotao = () => !(this.validaCampos());

  gerenciaClique = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(salvaEmail(email));
    history.push('/carteira');
  };

  render() {
    return (
      <div>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            id="email"
            onChange={ this.gerenciaInput }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            id="senha"
            onChange={ this.gerenciaInput }
            data-testid="password-input"
          />
        </label>
        <button
          type="button"
          onClick={ this.gerenciaClique }
          disabled={ this.habilitaBotao() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
