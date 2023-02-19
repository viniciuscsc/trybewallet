import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    headerCurrency: 'BRL',
    total: 0,
  };

  render() {
    const { email } = this.props;
    const { headerCurrency, total } = this.state;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{total}</p>
        <p data-testid="header-currency-field">{headerCurrency}</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
});

export default connect(mapStateToProps)(Header);
