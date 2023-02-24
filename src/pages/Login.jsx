import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions/index';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  validateFields = () => {
    const { email, password } = this.state;
    const regexEmail = /\S+@\S+\.\S+/;
    const minLength = 6;

    const validEmail = regexEmail.test(email);
    const validPassword = password.length >= minLength;

    return validEmail && validPassword;
  };

  enableBtn = () => !(this.validateFields());

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(saveEmail(email));
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
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            id="password"
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ this.enableBtn() }
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
