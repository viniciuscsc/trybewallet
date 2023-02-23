import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

export default class App extends Component {
  render() {
    return (
      <>
        <Route path="/carteira" component={ Wallet } />
        <Route exact path="/" component={ Login } />
      </>
    );
  }
}
