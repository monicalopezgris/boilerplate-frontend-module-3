/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { GlobalStyle, theme } from './styles/variables';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BillList from './components/bill/BillList';
import BillNew from './components/bill/BillNew';
import BillUpdate from './components/bill/BillUpdate';
import ClientList from './components/clients/ClientList';
// import UpdateClient from './components/clients/UpdateClient';
import NewClient from './components/clients/NewClient';
import CompanyList from './components/company/CompanyList';
// import UpdateCompany from './components/company/UpdateCompany';
import NewCompany from './components/company/NewCompany';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import AuthProvider from './lib/AuthProvider';

class App extends Component {

  render() {
    return (
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <div>
            <div>
              <Reset />
              <PrivateRoute path="/" component={Navbar} />
              <Switch>
                <AnonRoute exact path="/signup" component={Signup} />
                <AnonRoute exact path="/login" component={Login} />
                <PrivateRoute path="/bill/new" component={BillNew} />
                <PrivateRoute path="/bill/:id" component={BillUpdate} />
                <PrivateRoute path="/bill" component={BillList} />
                <PrivateRoute exact path="/company" component={CompanyList} />
                {/* <PrivateRoute exact path="/company/:id" component={UpdateCompany} /> */}
                <PrivateRoute exact path="/company/new" component={NewCompany} />
                <PrivateRoute exact path="/client" component={ClientList} />
                {/* <PrivateRoute exact path="/client/:id" component={UpdateClient} /> */}
                <PrivateRoute exact path="/client/new" component={NewClient} />
              </Switch>
            </div>
            <GlobalStyle />
          </div>
        </ThemeProvider>
      </AuthProvider>
    );
  }
}

export default App;
