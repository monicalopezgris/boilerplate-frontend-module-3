/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { GlobalStyle, theme } from './styles/variables'
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dash from './pages/Dash';
import Bill from './pages/Bill';
import Client from './pages/Client';
import Company from './pages/Company';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import AuthProvider from './lib/AuthProvider';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <div className="container">
            <Reset />
            <PrivateRoute path="/" component={Navbar} />
            <Switch>
              <AnonRoute exact path="/signup" component={Signup} />
              <AnonRoute exact path="/login" component={Login} />
              <PrivateRoute exact path="/:id" component={Bill} />
              <PrivateRoute exact path="/new" component={Bill} />
              <PrivateRoute exact path="/" component={Dash} />
              <PrivateRoute exact path="/company/:id" component={Company} />
              <PrivateRoute exact path="/company/new" component={Company} />
              <PrivateRoute exact path="/client/:id" component={Client} />
              <PrivateRoute exact path="/client/new" component={Client} />
            </Switch>
            <GlobalStyle />
          </div>
        </ThemeProvider>
      </AuthProvider>
    );
  }
}

export default App;
