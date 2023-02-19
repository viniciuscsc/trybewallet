import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    disabledBtn: true,
    email: '',
    password: '',
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value }, () => {
      const { email, password } = this.state;
      const regexEmail = /\S+@\S+\.\S+/;
      const shortestPassword = 6;

      if (regexEmail.test(email) || password.length > shortestPassword) {
        this.setState({ disabledBtn: false });
      } else {
        this.setState({ disabledBtn: true });
      }
    });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  render() {
    const { disabledBtn } = this.state;

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
          disabled={ disabledBtn }
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
