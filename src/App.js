/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { GlobalStyle, theme } from './styles/variables';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dash from './pages/Dash';
import ErrorPage from './pages/Error';
import BillNew from './components/bill/New';
import BillUpdate from './components/bill/Update';
import ClientUpdate from './components/clients/Update';
import ClientNew from './components/clients/NewClient';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import AuthProvider from './lib/AuthProvider';

const Wrapper = styled.div`
  background-color: ${props => props.theme.color.secondaryColor};
  display:flex;
`;

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <div>
            <Reset />
            <Wrapper>
              <PrivateRoute path="/" component={Navbar} />
              <Switch>
                <AnonRoute exact path="/signup" component={Signup} />
                <AnonRoute exact path="/login" component={Login} />
                <PrivateRoute exact path="/bill/new" component={BillNew} />
                <PrivateRoute path="/bill/:id" component={BillUpdate} />
                <PrivateRoute path="/client/new" component={ClientNew} />
                <PrivateRoute path="/client/:id" component={ClientUpdate} />
                <PrivateRoute exact path="/" component={Dash} />
                <PrivateRoute path="/" component={ErrorPage} />
              </Switch>
            </Wrapper>
            <GlobalStyle />
          </div>
        </ThemeProvider>
      </AuthProvider>
    );
  }
}

export default App;
