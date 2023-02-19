import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    isDisabled: true,
    password: '',
  };

  validateFields = () => {
    const { email, password } = this.state;
    const regexEmail = /\S+@\S+\.\S+/;
    const shortestPassword = 6;

    const validateEmail = regexEmail.test(email);
    const validatePassword = password.length >= shortestPassword;

    return validateEmail && validatePassword;
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value }, () => {
      const isDisabled = !(this.validateFields());
      this.setState({ isDisabled });
    });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;

    return (
      <div>
        <label htmlFor="email">
          Email:
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
          disabled={ isDisabled }
          onClick={ this.handleClick }
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
